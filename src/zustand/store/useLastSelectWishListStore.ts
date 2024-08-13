import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type useLastSelectWishListStoreType = {
  lastSelectTab: string;
  setLastSelectTab: (lastSelectTab: string) => void;
};

const useLastSelectWishListStore = create<useLastSelectWishListStoreType>()(
  persist(
    (set) => ({
      lastSelectTab: 'likedGoods',
      setLastSelectTab: (lastSelectTab) => set({ lastSelectTab }),
    }),
    {
      name: 'LastSelectedWishListTab',
    },
  ),
);

export default useLastSelectWishListStore;
