import { dateType } from '@/types/tour';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useTourDate = create<dateType>()(
  persist(
    (set) => ({
      departDate: null,
      arriveDate: null,
      setDepartDate: (depart) => set({ departDate: depart }),
      setArriveDate: (arrive) => set({ arriveDate: arrive }),
    }),
    {
      name: 'tourDate-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
