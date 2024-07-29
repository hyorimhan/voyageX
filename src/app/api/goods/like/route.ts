import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

const supabase = createClient();

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const table = searchParams.get('table');
  if (!user_id) return NextResponse.json({ error: '로그인 해주세요.' });
  if (!table) return NextResponse.json({ error: '테이블을 선택해주세요.' });
  if (table === 'liked_goods') {
    const { data, error } = await supabase
      .from('liked_goods')
      .select(
        `
      goods_id,
      user_id,
      goods: goods_id (*)
      `,
      )
      .eq('user_id', user_id);
    if (error) return NextResponse.json({ error });
    return NextResponse.json(data);
  } else if (table === '') {
  }
};
