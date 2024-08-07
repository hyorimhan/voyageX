import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

type ParamsType = {
  params: { user_id: string };
};

export const POST = async (request: Request, { params }: ParamsType) => {
  const { user_id } = params;
  const {
    order_id,
    tour_id,
    customer,
    depart_date,
    arrive_date,
    gate,
    qr_code,
    pay_method,
    installment,
  } = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase.from('tour_orders').insert({
    id: order_id,
    user_id,
    tour_id,
    passenger: customer.customerName,
    phone: customer.customerPhone,
    passenger_email: customer.customerEmail,
    depart_date,
    arrive_date,
    gate,
    qr_code,
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
