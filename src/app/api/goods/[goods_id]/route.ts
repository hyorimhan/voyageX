import { createClient } from '@/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient();

export type ParamsType = {
  params: { goods_id: string };
};

export const GET = async (req: NextRequest, { params }: ParamsType) => {
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
