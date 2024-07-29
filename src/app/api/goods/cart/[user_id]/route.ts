import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

const supabase = createClient();

export type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const { user_id } = params;
  const { data, error } = await supabase
    .from('cart')
    .select(
      `
      goods_id,
      user_id,
      quantity,
      goods: goods_id (*)
      `,
    )
    .eq('user_id', user_id);
  if (error) return NextResponse.json({ error });
  console.log(data);
  return NextResponse.json(data);
};
