import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CustomerType = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
};

type CustomerInfoType = {
  customerInfo: CustomerType | null;
  setCustomerInfo: (customerInfo: CustomerType | null) => void;
};

const useCustomerInfoStore = create<CustomerInfoType>()(
  persist(
    (set) => ({
      customerInfo: null,
      setCustomerInfo: (customerInfo) => set({ customerInfo }),
    }),
    {
      name: 'customerInfo',
    },
  ),
);

export default useCustomerInfoStore;
