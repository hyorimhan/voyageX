import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tours')
    .select(`*, planets(*)`)
    .order('rating_avg', { ascending: false });
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
