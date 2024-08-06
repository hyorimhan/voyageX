import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { goods_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { goods_id } = params;
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  if (!user_id) return NextResponse.json({ ereor: '로그인 해주세요.' });
  const { data, error } = await supabase
    .from('liked_goods')
    .select('*')
    .match({ goods_id, user_id });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(!!data.length);
};

export const POST = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { goods_id } = params;
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  if (!user_id)
    return NextResponse.json({ error: '유저id를 받지 못했습니다.' });
  const { data, error } = await supabase.from('liked_goods').insert({
    goods_id,
    user_id,
  });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};

export const DELETE = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { goods_id } = params;
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  if (!user_id)
    return NextResponse.json({ error: '유저 id를 받지 못했습니다.' });
  const { data, error } = await supabase
    .from('liked_goods')
    .delete()
    .match({ goods_id, user_id });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
