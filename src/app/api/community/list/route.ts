import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    notFound();
  }

  return NextResponse.json({ data });
}
