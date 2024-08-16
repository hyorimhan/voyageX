import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type useLastSelectWishListStoreType = {
  lastSelectTab: 'LikedGoods' | 'MyCart';
  setLastSelectTab: (lastSelectTab: 'LikedGoods' | 'MyCart') => void;
};

const useLastSelectWishListStore = create<useLastSelectWishListStoreType>()(
  persist(
    (set) => ({
      lastSelectTab: 'LikedGoods',
      setLastSelectTab: (lastSelectTab) => set({ lastSelectTab }),
    }),
    {
      name: 'LastSelectedWishListTab',
    },
  ),
);

export default useLastSelectWishListStore;
