import { create } from 'zustand';

type CustomerType = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
};

type CustomerInfoType = {
  customerInfo: CustomerType | null;
  setCustomerInfo: (customerInfo: CustomerType | null) => void;
};

const useCustomerInfoStore = create<CustomerInfoType>((set) => ({
  customerInfo: null,
  setCustomerInfo: (customerInfo) => set({ customerInfo }),
}));

export default useCustomerInfoStore;
