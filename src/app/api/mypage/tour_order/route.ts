import { createClient } from '@/supabase/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_id } = req.query;
  const supabase = createClient();

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // 1. 사용자 아이디를 기준으로 주문 내역 가져오기
    const { data: tourOrders, error: ordersError } = await supabase
      .from('tour_orders')
      .select('*')
      .eq('user_id', user_id);

    if (ordersError) throw ordersError;

    // tour_id 추출
    const tourIds = tourOrders.map((order) => order.tour_id);

    // 2. tour_id를 기준으로 투어 정보 가져오기
    const { data: tours, error: toursError } = await supabase
      .from('tours')
      .select('*')
      .in('tour_id', tourIds);

    if (toursError) throw toursError;

    // planet_id 추출
    const planetIds = tours.map((tour) => tour.planet_id);

    // 3. planet_id를 기준으로 행성 정보 가져오기
    const { data: planets, error: planetsError } = await supabase
      .from('plants')
      .select('*')
      .in('planet_id', planetIds);

    if (planetsError) throw planetsError;

    // 데이터 조합
    const result = tourOrders.map((order) => {
      const tour = tours.find((tour) => tour.tour_id === order.tour_id);
      const planet = planets.find(
        (planet) => planet.planet_id === tour?.planet_id,
      );
      return { ...order, tour, planet };
    });

    res.status(200).json(result);
  } catch (error) {}
}
