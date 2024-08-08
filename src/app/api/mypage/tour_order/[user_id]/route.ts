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
    .select('*')
    .eq('user_id', user_id);

  if (tourOrderError) {
    return NextResponse.json({
      error: '여행상품 주문 목록을 불러올 수 없습니다.',
    });
  }

  const tourIds = tourOrders.map((tour_order) => tour_order.tour_id);

  const { data: tours, error: tourError } = await supabase
    .from('tours')
    .select('*')
    .in('id', tourIds);

  if (tourError) {
    return NextResponse.json({ error: '여행 상품 정보를 불러올 수 없습니다.' });
  }

  if (!tours || tours.length === 0) {
    console.log('No tours found');
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

  if (!planets || planets.length === 0) {
    console.log('No planets found');
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
