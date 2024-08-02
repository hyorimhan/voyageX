import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json(data);
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
  if (error) return NextResponse.json(error);
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

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json(data);
}
