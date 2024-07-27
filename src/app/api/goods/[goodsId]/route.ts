import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

const supabase = createClient();

export type ParamsType = {
  params: { goodsId: string };
};

export const POST = async (request: Request, { params }: ParamsType) => {
  const { goodsId } = params;
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  if (!user_id)
    return NextResponse.json({ error: '유저id를 받지 못했습니다.' });
  const { data, error } = await supabase.from('liked_goods').insert({
    goods_id: goodsId,
    user_id,
  });
  if (error) return NextResponse.json({ error: error });
  return NextResponse.json(data);
};
