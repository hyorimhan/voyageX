export interface Tour {
  id: string;
  price: number;
  tag: string;
  spaceship?: string | null;
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
