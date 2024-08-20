import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 10;

  if (!search) {
    return NextResponse.json(
      {
        error: 'Search Query is required',
      },
      { status: 400 },
    );
  }

  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase
      .from('news')
      .select('*', { count: 'exact' })
      .or(`title.ilike.%${search}%, description.ilike.%${search}%`)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json({
      results: data,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    console.error('Error searching news:', error);
    return NextResponse.json(
      { error: 'Failed to search news' },
      { status: 500 },
    );
  }
}
