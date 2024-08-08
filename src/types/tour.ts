export type toggleLikeToursParamsType = {
  tour_id: string;
  user_id: string;
  isLiked: boolean;
};

export type TourOrderType = {
  id: string;
  tour_id: string;
};

export type dateType = {
  tourDate: {
    departDate: string | null;
    arriveDate: string | null;
  };
  setTourDate: (depart: string, arrive: string) => void;
  setTourDateReset: () => void;
};
