import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const { user_id } = params;
  const goods_id = searchParams.get('goods_id');
  const review_id = searchParams.get('review_id');
  const { data, error } = await supabase
    .from('goods_reviews')
    .select('*')
    .match({ user_id, goods_id, id: review_id })
    .single();
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};

export const POST = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { review_id, goods_id, order_id, rating, review } =
    await request.json();
  const { data, error } = await supabase.from('goods_reviews').insert([
    {
      id: review_id,
      user_id,
      goods_id,
      rating,
      review,
    },
  ]);
  if (error) return NextResponse.json({ error });
  const { data: createReviewIdSuccess, error: createReviewIdFail } =
    await supabase
      .from('goods_orders')
      .update({ review_id })
      .match({ order_id, goods_id });
  if (createReviewIdFail)
    return NextResponse.json({ error: createReviewIdFail });
  console.log('createReviewIdSuccess => ', createReviewIdSuccess);
  return NextResponse.json(data);
};

export const PATCH = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { review_id, goods_id, rating, review } = await request.json();
  const { data, error } = await supabase
    .from('goods_reviews')
    .update({ rating, review })
    .match({ id: review_id, user_id, goods_id });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
