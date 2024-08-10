export type toggleLikeToursParamsType = {
  tour_id: string;
  user_id: string;
  isLiked: boolean;
};

export type TourOrderType = {
  id: string;
  tour_id: string;
  pay_at: string;
  depart_place: string;
  planet: PlanetType;
  depart_date: string;
  depart_time: string;
  arrive_date: string;
  arrive_time: string;
  spaceship_name: string;
  passenger: string;
  spaceship_code: string;
  gate: string;
  tour: TourType;
  phone: string;
  pay_method: string;
  installment: string;
  length: number;
  review_id?: string;
};

export type PlanetType = {
  description: string;
  english_name: string;
  id: string;
  name: string;
  planet_img: string;
  title: string;
  ticket_web_img: string;
};

export type TourType = {
  price: number;
};

export type dateType = {
  tourDate: {
    departDate: string | null;
    arriveDate: string | null;
  };
  setTourDate: (depart: string, arrive: string) => void;
  setTourDateReset: () => void;
};
