import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } },
) {
  const { category } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json(data);
}
