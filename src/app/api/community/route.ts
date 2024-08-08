import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const { count, error: commentError } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      if (commentError) {
        return { ...post, comments: 0 };
      }

      return { ...post, comments: count };
    }),
  );

  return NextResponse.json(postsWithComments);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const newPost = await request.json();
  const { data, error } = await supabase.from('posts').insert(newPost);
  if (error) return NextResponse.json(error);
  return NextResponse.json(data);
}
