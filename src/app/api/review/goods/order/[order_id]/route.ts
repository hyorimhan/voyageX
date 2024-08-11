import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { order_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const { order_id } = params;
  const goods_id = searchParams.get('goods_id');
  const { data, error } = await supabase
    .from('goods_orders')
    .select('review_id')
    .match({ order_id, goods_id })
    .single();
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
