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

  const { data: goodsOrders, error: goodsOrderError } = await supabase
    .from('goods_orders')
    .select('*')
    .eq('user_id', user_id);

  if (goodsOrderError) {
    return NextResponse.json({ error: '주문목록을 불러올 수 없습니다.' });
  }

  if (!goodsOrders || goodsOrders.length === 0) {
    return NextResponse.json({ error: '주문목록이 없습니다.' });
  }

  const goodsIds = goodsOrders.map((goods_order) => goods_order.goods_id);

  const { data: goods, error: goodsError } = await supabase
    .from('goods')
    .select('*')
    .in('id', goodsIds);

  if (goodsError) {
    return NextResponse.json({ error: '상품 정보를 불러올 수 없습니다.' });
  }

  const ordersWithGoods = goodsOrders.map((order) => {
    return {
      ...order,
      goods: goods.find((goods) => goods.id === order.goods_id),
    };
  });

  return NextResponse.json(ordersWithGoods);
}
