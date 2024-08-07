import { createClient } from '@/supabase/client';
import { toggleLikeToursParamsType } from '@/types/tour';
import axios from 'axios';

const supabase = createClient();

// 투어 리스트
export const tourList = async () => {
  const { data: tours, error } = await supabase.from('tours').select(`
    id,
    price, 
    tag,
    spaceship,
    planets (
      name, 
      planet_img,
      description,
      title,
      english_name
    )
  `);
  if (error) {
    console.log(error);
  }
  return tours ?? [];
};

// 투어 상세
export const tourDetail = async (id: string) => {
  const { data: tours, error } = await supabase
    .from('tours')
    .select(
      `
  price,
  tag,
  id,
  amount,
  spaceship,
  planets (
    name,
    description,
    planet_img,
    title,
    english_name
  )
  `,
    )
    .eq('id', id);
  if (error) {
    throw error;
  }

  return tours ?? [];
};

// 투어 일정, 날짜
export const tourSchedule = async (id: string) => {
  const { data: schedule, error } = await supabase
    .from('tour_days')
    .select(
      `
    id,
    tour_id,
    day,
    date,
    description,
    tour_activities (
    schedule1,
    schedule2,
    meal
    )
    `,
    )
    .eq('tour_id', id)
    .order('day', { ascending: true });

  if (error) {
    throw error;
  }

  return schedule ?? [];
};

//투어 결제 (주문자 정보)
export const userAddress = async (id: string) => {
  const response = await fetch('/api/tours/tourOrderInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const responseData = await response.json();
  return responseData;
};

export const getLikedToursByUser = async (user_id: string) => {
  const response = await axios.get(`/api/tours/like/${user_id}`);
  return response.data;
};

export const getIsLikeTourByUser = async (tour_id: string, user_id: string) => {
  const response = await axios.get(
    `/api/tours/${tour_id}/like?user_id=${user_id}`,
  );
  return response.data;
};

export const toggleLikeTours = async (
  toggleLikeGoodsParams: toggleLikeToursParamsType,
) => {
  const { tour_id, user_id, isLiked } = toggleLikeGoodsParams;
  if (isLiked) {
    const response = await axios.delete(
      `/api/tours/${tour_id}/like?user_id=${user_id}`,
    );
    console.log(response);
    return response;
  } else {
    const response = await axios.post(
      `/api/tours/${tour_id}/like?user_id=${user_id}`,
    );
    console.log(response);
    return response;
  }
};

// 투어 결제 (테이블에 넣기)
// export const tourPayment = async ({
//   userId,
//   tourId,
//   customerName,
//   customerMobilePhone,
//   customerEmail,
//   totalPrice,
//   amount,
// }: {
//   userId: string;
//   tourId: string;
//   customerName: string;
//   customerMobilePhone: string;
//   customerEmail: string;
//   totalPrice: number;
//   amount: number;
// }) => {
//   const { error } = await supabase.from('tour_orders').insert([
//     {
//       user_id: userId,
//       tour_id: tourId,
//       customer_name: customerName,
//       customer_phone: customerMobilePhone,
//       customer_email: customerEmail,
//       total_price: totalPrice,
//       amount: amount,
//     },
//   ]);
//   return { error };
// };
