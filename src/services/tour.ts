import { createClient } from '@/supabase/client';
import axios from 'axios';
import { toggleLikeToursParamsType, TourOrderType } from '@/types/tour';
import { Tour } from '@/types/tourPropsType';

const supabase = createClient();

export interface Planet {
  id: string;
  name: string;
  description: string;
  planet_img: string;
  title: string | null;
  english_name: string | null;
  price?: number;
}

export interface tourProps {
  params: {
    id: string;
  };
}

// 투어 리스트
export const tourList = async (): Promise<Tour[]> => {
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
    throw error;
  }

  return tours || [];
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
  spaceship,
  ship_code,
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
    schedule,
    meal,
    tour_img
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

//투어 주문목록 불러오기
export const getTourOrder = async (
  user_id: string | undefined,
): Promise<TourOrderType[]> => {
  const response = await axios.get(`/api/mypage/tour_order/user/${user_id}`);
  return response.data;
};

export const getTourOrderDetail = async (
  order_id: string,
): Promise<TourOrderType> => {
  const response = await axios.get(`/api/mypage/tour_order/tour/${order_id}`);
  return response.data;
};

export const getTourDateList = async () => {
  const { data: dateList, error } = await supabase
    .from('tour_date_list')
    .select(`depart_date, arrive_date, id`);
  if (error) {
    throw error;
  }
  return dateList ?? [];
};
