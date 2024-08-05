import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id');
  const supabase = createClient();

  if (!user_id) {
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다' });
  }

  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return NextResponse.json({ error: '작성한 게시물을 불러올 수 없습니다.' });
  }
  return NextResponse.json(data);
}
