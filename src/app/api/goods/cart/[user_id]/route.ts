import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { data, error } = await supabase
    .from('cart')
    .select(
      `
      id,
      goods_id,
      user_id,
      quantity,
      goods: goods_id (*)
      `,
    )
    .eq('user_id', user_id);
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};

export const DELETE = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { searchParams } = new URL(request.url);
  const idList = searchParams.get('idList');
  if (!idList)
    return NextResponse.json({ error: '삭제할 장바구니의 id가 필요합니다.' });
  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', user_id)
    .in('id', JSON.parse(idList));
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};

export const PATCH = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { searchParams } = new URL(request.url);
  const cart_id = searchParams.get('cart_id');
  const prev = searchParams.get('prev');
  const task = searchParams.get('task');
  if (!cart_id || !prev || !task)
    return NextResponse.json({ error: '쿼리스트링을 확인해주세요.' });
  if (task === 'increase') {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: +prev + 1 })
      .match({ id: cart_id, user_id });
    if (error) return NextResponse.json({ error });
    return NextResponse.json(data);
  } else if (task === 'decrease') {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: +prev - 1 })
      .match({ id: cart_id, user_id });
    if (error) return NextResponse.json({ error });
    return NextResponse.json(data);
  }
};
