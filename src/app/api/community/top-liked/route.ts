import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const limit = 4;

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

  const topPosts = postsWithLikes
    .map((post) => ({
      ...post,
      likes_count: post.likes[0]?.count || 0,
    }))
    .sort((a, b) => b.likes_count - a.likes_count)
    .slice(0, limit);

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
