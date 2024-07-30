import { createClient } from '@/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient();

export type ParamsType = {
  params: { goods_id: string };
};

export const GET = async (req: NextRequest, { params }: ParamsType) => {
  const { searchParams } = new URL(req.url);
  const { goods_id } = params;

  if (!goods_id) {
    return NextResponse.json({ error: 'Invalid ID' });
  }

  const { data, error } = await supabase
    .from('goods')
    .select('*')
    .eq('id', goods_id);

  if (error) {
    return NextResponse.json({ error: 'Item not found' });
  }

  return NextResponse.json(data);
};
