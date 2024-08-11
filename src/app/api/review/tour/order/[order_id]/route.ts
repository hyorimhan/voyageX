import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { order_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const { order_id } = params;
  const tour_id = searchParams.get('tour_id');
  const { data, error } = await supabase
    .from('tour_orders')
    .select('review_id')
    .match({ id: order_id, tour_id })
    .single();
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
