import { dateType } from '@/types/tour';
import { create } from 'zustand';

export const useTourDate = create<dateType>((set) => ({
  departDate: null,
  arriveDate: null,
  setDepartDate: (depart) => set({ departDate: depart }),
  setArriveDate: (arrive) => set({ arriveDate: arrive }),
}));
