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
  ticket_mobile_img: string;
};

export type TourType = {
  price: number;
  spaceship: string;
};

export type dateType = {
  tourDate: {
    departDate: string | null;
    arriveDate: string | null;
  };
  setTourDate: (depart: string, arrive: string) => void;
  setTourDateReset: () => void;
};

export type TopRatedTours = {
  id: string;
  planet_id: string;
  price: number;
  tag: string;
  spaceship: string;
  ship_code: string;
  rating_avg: number;
  planets: {
    id: string;
    name: string;
    title: string;
    planet_img: string;
    description: string;
    english_name: string;
    tiket_web_img: string;
  };
};

export type tourOrderListType = {
  id: string;
  user_id: string;
  tour_id: string;
  pay_at: string;
  passenger: string;
  phone: string;
  passenger_email: string;
  depart_place: string;
  depart_date: string;
  arrive_date: string;
  spaceship_name: string;
  spaceship_code: string;
  gate: string;
  qr_code: string;
  depart_time: string;
  arrive_time: string;
  pay_method: string;
  installment: number;
  review_id: null | string;
  tours: {
    id: string;
    tag: string;
    price: number;
    planet_id: string;
    ship_code: string;
    spaceship: string;
    rating_avg: number;
    planets: {
      id: string;
      name: string;
      description: string;
      planet_img: string;
      english_name: string;
      title: string;
      ticket_web_img: string;
      ticket_mobile_img: string;
    };
  };
};
