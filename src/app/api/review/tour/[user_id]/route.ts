import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const { user_id } = params;
  const tour_id = searchParams.get('tour_id');
  const review_id = searchParams.get('review_id');
  const { data, error } = await supabase
    .from('tour_reviews')
    .select('*')
    .match({ user_id, tour_id, id: review_id })
    .single();
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};

export const POST = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { review_id, tour_id, order_id, rating, review } = await request.json();
  const { data, error } = await supabase.from('tour_reviews').insert([
    {
      id: review_id,
      user_id,
      tour_id,
      rating,
      review,
    },
  ]);
  if (error) return NextResponse.json({ error });
  const { data: createReviewIdSuccess, error: createReviewIdFail } =
    await supabase
      .from('tour_orders')
      .update({ review_id })
      .match({ id: order_id, tour_id });
  if (createReviewIdFail)
    return NextResponse.json({ error: createReviewIdFail });
  console.log('createReviewIdSuccess => ', createReviewIdSuccess);
  return NextResponse.json(data);
};

export const PATCH = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { review_id, tour_id, rating, review } = await request.json();
  const { data, error } = await supabase
    .from('tour_reviews')
    .update({ rating, review })
    .match({ id: review_id, user_id, tour_id });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
