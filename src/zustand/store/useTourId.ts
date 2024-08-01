import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      getStorage: () => sessionStorage,
    },
  ),
);

export default useTourIdStore;
