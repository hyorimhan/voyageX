import { createClient } from '@/supabase/client';
import axios from 'axios';
import { toggleLikeToursParamsType, TourOrderType } from '@/types/tour';

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

export interface Tour {
  price: number;
  tag: string;
  id: string;
  spaceship: string | null;
  planets: Planet[];
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

  // planets가 null인 경우 빈 배열로 처리
  return tours.map(tour => ({
    ...tour,
    planets: tour.planets ? [tour.planets] : []
  })) as Tour[];
};

// 투어 상세
export const tourDetail = async (id: string): Promise<Tour | null> => {
  const { data: tour, error } = await supabase
    .from('tours')
    .select(
      `
      price,
      tag,
      id,
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
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  // planets가 null인 경우 빈 배열로 처리
  const normalizedTour = tour ? {
    ...tour,
    planets: tour.planets ? [tour.planets] : []
  } : null;

  return normalizedTour as Tour | null;
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
export const getTourOrderDetail = async (
  user_id: string | undefined,
): Promise<TourOrderType[]> => {
  const response = await axios.get(`/api/mypage/tour_order/${user_id}`);
  return response.data;
};