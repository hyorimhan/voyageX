import { Tables } from '@/types/supabase';
import { create } from 'zustand';

type ExpressAddressType = {
  expressAddress: Tables<'addresses'> | null;
  setExpressAddress: (expressAddress: Tables<'addresses'> | null) => void;
};

const useExpressInfoStore = create<ExpressAddressType>((set) => ({
  expressAddress: null,
  setExpressAddress: (expressAddress) => set({ expressAddress }),
}));

export default useExpressInfoStore;
