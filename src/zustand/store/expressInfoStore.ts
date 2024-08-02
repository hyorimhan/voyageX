import { Tables } from '@/types/supabase';
import { Address } from '@/types/userAddressType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExpressAddressType = {
  expressAddress: Address | null;
  setExpressAddress: (expressAddress: Address | null) => void;
};

const useExpressInfoStore = create<ExpressAddressType>()(
  persist(
    (set) => ({
      expressAddress: null,
      setExpressAddress: (expressAddress) => set({ expressAddress }),
    }),
    {
      name: 'expressInfo',
    },
  ),
);

export default useExpressInfoStore;
