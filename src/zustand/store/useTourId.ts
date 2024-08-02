import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface tourIdType {
  tourUrl: string;
  setTourId: (id: string) => void;
}

const useTourIdStore = create<tourIdType>()(
  persist(
    (set) => ({
      tourUrl: '',
      setTourId: (id: string) => set({ tourUrl: id }),
    }),
    {
      name: 'tourId-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useTourIdStore;
