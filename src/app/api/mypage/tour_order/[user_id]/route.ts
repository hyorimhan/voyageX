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

  const { data: tourOrders, error: tourOrderError } = await supabase
    .from('tour_orders')
    .select('*')
    .eq('user_id', user_id);

  if (tourOrderError) {
    return NextResponse.json({
      error: '여행상품 주문 목록을 불러올 수 없습니다.',
    });
  }

  // if (!tourOrders || tourOrders.length === 0) {
  //   return NextResponse.json({ error: '주문목록이 없습니다.' });
  // }

  const tourIds = tourOrders.map((tour_order) => tour_order.tour_id);

  const { data: tours, error: tourError } = await supabase
    .from('tour')
    .select('*')
    .in('id', tourIds);

  if (tourError) {
    return NextResponse.json({ error: '여행 상품 정보를 불러올 수 없습니다.' });
  }

  const planetIds = tours.map((tour) => tour.planet_id);

  const { data: planets, error: planetsError } = await supabase
    .from('planets')
    .select('*')
    .in('id', planetIds);

  if (planetsError) {
    return NextResponse.json({ error: '행성 정보를 불러올 수 없습니다.' });
  }

  const ordersWithDetails = tourOrders.map((order) => {
    const tour = tours.find((t) => t.id === order.tour_id);
    const planet = planets.find((p) => p.id === tour?.planet_id);

    return {
      ...order,
      tour,
      planet,
    };
  });

  return NextResponse.json(ordersWithDetails);
}
