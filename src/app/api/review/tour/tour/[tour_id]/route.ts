import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { tour_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { tour_id } = params;
  const { data, error } = await supabase
    .from('tour_reviews')
    .select('*, user:users(email)')
    .eq('tour_id', tour_id)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
