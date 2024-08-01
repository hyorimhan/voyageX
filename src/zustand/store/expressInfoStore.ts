import { Tables } from '@/types/supabase';
import { Address } from '@/types/userAddressType';
import { create } from 'zustand';

type ExpressAddressType = {
  expressAddress: Address | null;
  setExpressAddress: (expressAddress: Address | null) => void;
};

const useExpressInfoStore = create<ExpressAddressType>((set) => ({
  expressAddress: null,
  setExpressAddress: (expressAddress) => set({ expressAddress }),
}));

export default useExpressInfoStore;
