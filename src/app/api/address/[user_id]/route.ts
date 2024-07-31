import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

const supabase = createClient();

type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const { user_id } = params;
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user_id);
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
