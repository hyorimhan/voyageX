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
    .select(
      `
      *,
        goods (*)
      `,
    )
    .eq('order_id', order_id);

  if (goodsOrderError) {
    return NextResponse.json({ goodsOrderError });
  }

  if (!goodsOrder) {
    return NextResponse.json({ error: '주문이 없습니다.' });
  }
  return NextResponse.json(goodsOrder);
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
    .eq('order_id', order_id);

  if (error) {
    return NextResponse.json({
      error,
    });
  }
  return NextResponse.json({ message: '굿즈 주문내역이 삭제되었습니다.' });
}
