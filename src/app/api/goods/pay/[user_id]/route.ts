import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { user_id: string };
};

export const POST = async (request: Request, { params }: ParamsType) => {
  const { user_id } = params;
  const {
    order_id,
    goods_id,
    quantity,
    total_price,
    customer,
    address_id,
    pay_method,
    installment,
  } = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase.from('goods_orders').insert({
    id: order_id,
    user_id,
    goods_id,
    quantity,
    state: '구매확정',
    total_price,
    recipient: customer.customerName,
    phone: customer.customerPhone,
    address_id,
    pay_method,
    installment,
  });
  if (error)
    return NextResponse.json({
      error: error,
      message: '영수증 추가 실패',
    });
  return NextResponse.json(data);
};
