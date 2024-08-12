import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const { count: total } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .ilike('title', `%${query}%`);

  if (error || !posts) {
    return notFound();
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

      return { ...post, comments: commentCount || 0, likes: likeCount || 0 };
    }),
  );

  return NextResponse.json({
    posts: postsDetails,
    total: total || 0,
    page,
    totalPages: total ? Math.ceil(total / limit) : 1,
  });
}
