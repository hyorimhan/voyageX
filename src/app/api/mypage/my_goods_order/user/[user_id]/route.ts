import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } },
) {
  const { user_id } = params;
  const supabase = createClient();

  if (!user_id) {
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다' });
  }

  const { data: orderedGoods, error: goodsOrderError } = await supabase
    .from('goods_orders')
    .select(
      `*,
      goods(*)
      `,
    )
    .eq('user_id', user_id);

  if (goodsOrderError) {
    return NextResponse.json({ error: '주문목록을 불러올 수 없습니다.' });
  }

  return NextResponse.json(orderedGoods);
}
