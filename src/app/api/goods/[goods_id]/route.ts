import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { goods_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { goods_id } = params;

  if (!goods_id) {
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다.' });
  }

  const { data, error } = await supabase
    .from('goods')
    .select('*')
    .eq('id', goods_id);

  if (error) {
    return NextResponse.json({ error: '굿즈 아이템을 찾을 수 없습니다.' });
  }

  return NextResponse.json(data);
};
