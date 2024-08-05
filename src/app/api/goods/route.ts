import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const order = searchParams.get('order') || 'like_count';
  const { data, error } = await supabase
    .from('goods')
    .select('*')
    .order(order.split('-').join(''), { ascending: order.includes('-') });
  if (error) return NextResponse.json({ error: error });
  return NextResponse.json(data);
};
