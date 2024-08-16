import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } },
) {
  const { user_id } = params;
  const supabase = createClient();

  const { data: tourOrders, error: tourOrderError } = await supabase
    .from('tour_orders')
    .select(
      `*, 
      tours(*,
        planets(*)
      )
      `,
    )
    .eq('user_id', user_id)
    .order('pay_at', { ascending: false });

  if (tourOrderError) {
    return NextResponse.json({
      error: tourOrderError,
    });
  }

  return NextResponse.json(tourOrders);
}
