import { ReactNode } from 'react';

export interface Tour {
  planet_id: string;
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
}

export type TourSchedule = {
  id: string | null;
  tour_id: string | null;
  day: string | null;
  date: string | null;
  description: string | null;
  tour_activities: {
    schedule: string | null;
    meal: string | null;
    tour_img: string | null;
  } | null;
};

export interface tourProps {
  params: {
    id: string;
  };
}

export interface propsText {
  title?: string | ReactNode;
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
