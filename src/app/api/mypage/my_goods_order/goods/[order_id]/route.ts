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
  const addressIds = goodsOrder.map((order) => order.address_id);

  const { data: goods, error: goodsError } = await supabase
    .from('goods')
    .select('*')
    .in('id', goodsIds);

  if (goodsError) {
    return NextResponse.json({ error: goodsError });
  }

  const { data: addresses, error: addressError } = await supabase
    .from('addresses')
    .select('*')
    .in('id', addressIds);

  if (addressError) {
    return NextResponse.json({ error: '주소 정보를 불러올 수 없습니다.' });
  }

  const orderWithGoods = goodsOrder.map((order) => {
    return {
      order,
      goods: goods.find((goods) => goods.id === order.goods_id),
      address: addresses.find((address) => address.id === order.address_id),
    };
  });
  return NextResponse.json(orderWithGoods);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { order_id: string } },
) {
  const { order_id } = params;
  const supabase = createClient();

  const { error } = await supabase
    .from('goods_orders')
    .delete()
    .eq('id', order_id);

  if (error) {
    return NextResponse.json({
      error: '굿즈 주문내역을 삭제하는 중 오류가 발생했습니다.',
    });
  }
  return NextResponse.json({ message: '굿즈 주문내역이 삭제되었습니다.' });
}
