import { dateType } from '@/types/tour';
import { create } from 'zustand';

export const useTourDate = create<dateType>((set) => ({
  tourDate: {
    departDate: null,
    arriveDate: null,
  },
  setTourDate: (depart, arrive) =>
    set({
      tourDate: {
        departDate: depart,
        arriveDate: arrive,
      },
    }),
  setTourDateReset: () =>
    set({
      tourDate: {
        departDate: null,
        arriveDate: null,
      },
    }),
}));
