import { Order } from '@/components/pay/PaymentWidget';
import { create } from 'zustand';

type userOrderType = {
  userOrder: Order | null;
  saveOrder: (info: Order) => string | void;
};

const useShopStore = create<userOrderType>((set) => ({
  userOrder: null,
  saveOrder: (info) => set({ userOrder: info }),
}));
export default useShopStore;
