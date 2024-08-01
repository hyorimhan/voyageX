import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type quantityType = {
  totalPrice: number | null;
  quantity: number | null;
  setTotalPrice: (price: number) => number | void;
  setQuantities: (quan: number) => number | void;
};

const useQuantityStore = create<quantityType>()(
  persist(
    (set) => ({
      totalPrice: null,
      quantity: null,
      setTotalPrice: (price) => set({ totalPrice: price }),
      setQuantities: (quan) => set({ quantity: quan }),
    }),
    {
      name: 'quantity',
      getStorage: () => sessionStorage,
    },
  ),
);

export default useQuantityStore;
