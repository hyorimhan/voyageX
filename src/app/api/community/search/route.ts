import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';

  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    notFound();
  }

  return NextResponse.json({ data });
}
