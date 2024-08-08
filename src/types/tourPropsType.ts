import { ReactNode } from 'react';

export interface Tour {
  id: string;
  price: number;
  tag: string;
  spaceship?: string | null;
  ship_code?: string | null;
  planets: {
    name: string;
    planet_img: string;
    description: string;
    title: string | null;
    english_name: string | null;
  } | null;
  rating_avg?: number;
  ship_code?: string | null;
}

export type TourSchedule = {
  id: string | null;
  tour_id: string | null;
  day: string | null;
  date: string | null;
  description: string | null;
  tour_activities: {
    schedule1: string | null;
    schedule2: string | null;
    meal: string | null;
  } | null;
};

export interface tourProps {
  params: {
    id: string;
  };
}

export interface propsText {
  title?: string;
  description?: string | ReactNode;
  borderTop?: string;
  contents?: string | React.ReactNode;
  containerStyle?: string;
}

export type TourDateList = {
  depart_date: string | null;
  arrive_date: string | null;
  id: string;
};
