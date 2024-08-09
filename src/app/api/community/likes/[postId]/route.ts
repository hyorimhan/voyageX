import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');

  if (!user_id)
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다' });

  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .match({ post_id: postId, user_id });

  if (error) return NextResponse.json({ error });
  return NextResponse.json(!!data.length);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');

  if (!user_id)
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다' });

  const { data, error } = await supabase.from('likes').insert({
    post_id: postId,
    user_id,
  });

  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');

  if (!user_id)
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다' });

  const { data, error } = await supabase
    .from('likes')
    .delete()
    .match({ post_id: postId, user_id });

  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
}
