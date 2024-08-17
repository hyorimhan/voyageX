import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } },
) {
  const { category } = params;
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  // 총 게시글 수 가져오기
  const { count: total, error: totalError } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('category', category);

  if (totalError || total === null) {
    return NextResponse.json(
      { error: totalError?.message || 'Total count retrieval failed' },
      { status: 500 },
    );
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const postsDetails = await Promise.all(
    posts.map(async (post) => {
      const { count: commentCount, error: commentError } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      const { count: likeCount, error: likeError } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      if (commentError || likeError) {
        return { ...post, comments: 0, likes: 0 };
      }

      return { ...post, comments: commentCount, likes: likeCount };
    }),
  );

  return NextResponse.json({
    posts: postsDetails,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
