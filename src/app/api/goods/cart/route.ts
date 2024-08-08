import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const DELETE = async (request: Request) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const idList = searchParams.get('idList');
  const goods_list: string[] = JSON.parse(idList!);
  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', user_id)
    .in('goods_id', goods_list);
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
