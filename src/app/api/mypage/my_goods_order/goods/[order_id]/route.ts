import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } },
) {
  const { order_id } = params;
  const supabase = createClient();

  if (!order_id) {
    return NextResponse.json({ error: '주문 ID를 찾을 수 없습니다' });
  }

  const { data: goodsOrder, error: goodsOrderError } = await supabase
    .from('goods_orders')
    .select('*')
    .eq('id', order_id);

  if (goodsOrderError) {
    return NextResponse.json({ goodsOrderError });
  }

  if (!goodsOrder) {
    return NextResponse.json({ error: '주문이 없습니다.' });
  }

  const goodsIds = goodsOrder.map((order) => order.goods_id);

  const { data: goods, error: goodsError } = await supabase
    .from('goods')
    .select('*')
    .in('id', goodsIds);

  if (goodsError) {
    return NextResponse.json({ error: goodsError });
  }

  const orderWithGoods = goodsOrder.map((order) => {
    return {
      order,
      goods: goods.find((goods) => goods.id === order.goods_id),
    };
  });
  return NextResponse.json(orderWithGoods);
}
