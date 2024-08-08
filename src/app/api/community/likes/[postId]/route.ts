import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const supabase = createClient();

  const { postId } = params;
  const userId = await request.json();
  const { data, error } = await supabase
    .from('likes')
    .insert({ post_id: postId, userId });

  if (error) return NextResponse.json(error);
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const userId = await request.json();
  const supabase = createClient();

  const { data, error } = await supabase
    .from('likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) return NextResponse.json(error);
  return NextResponse.json(data);
}
