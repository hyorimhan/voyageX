import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const limit = 3;

  // 먼저 모든 게시물의 좋아요 수를 계산합니다.
  const { data: postsWithLikes, error: likesError } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      category,
      created_at,
      user_id,
      likes:likes(count)
    `,
    )
    .order('created_at', { ascending: false });

  if (likesError) {
    return NextResponse.json({ error: likesError.message }, { status: 500 });
  }

  // 좋아요 수에 따라 정렬하고 상위 3개를 선택합니다.
  const topPosts = postsWithLikes
    .map((post) => ({
      ...post,
      likes_count: post.likes[0]?.count || 0,
    }))
    .sort((a, b) => b.likes_count - a.likes_count)
    .slice(0, limit);

  // 각 게시물에 대한 추가 정보를 가져옵니다.
  const postsWithDetails = await Promise.all(
    topPosts.map(async (post) => {
      const { count: commentsCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      return {
        ...post,
        likes: post.likes_count,
        comments: commentsCount || 0,
      };
    }),
  );

  return NextResponse.json(postsWithDetails);
}
