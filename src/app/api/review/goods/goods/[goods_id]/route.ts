import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { goods_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { goods_id } = params;
  const { data, error } = await supabase
    .from('goods_reviews')
    .select('*, user:users(email)')
    .eq('goods_id', goods_id)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
