import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const { count: commentsCount, error: commentsError } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  const { count: likesCount, error: likesError } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  if (commentsError || likesError)
    return NextResponse.json(
      { error: commentsError?.message || likesError?.message },
      { status: 500 },
    );

  const postDetails = {
    ...post,
    comments: commentsCount || 0,
    likes: likesCount || 0,
  };

  return NextResponse.json(postDetails);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const newPost = await request.json();
  const { data, error } = await supabase
    .from('posts')
    .update(newPost)
    .eq('id', postId);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
