import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .match({ user_id, is_default: true })
    .single();
  if (error) return NextResponse.json({ error });
  if (!data) return NextResponse.json({ error: '기본배송지가 없습니다.' });
  return NextResponse.json(data);
};
