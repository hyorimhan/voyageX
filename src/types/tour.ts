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
  departDate: string | null;
  arriveDate: string | null;
  setDepartDate: (depart: string) => void | string;
  setArriveDate: (arrive: string) => void | string;
};
