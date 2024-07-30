import { Order } from '@/components/order/payment/PaymentWidget';
import { create } from 'zustand';

type userOrderType = {
  userOrder: Order | null;
  setUserOrder: (info: Order) => string | void;
};

const useShopStore = create<userOrderType>((set) => ({
  userOrder: null,
  setUserOrder: (info) => set({ userOrder: info }),
}));
export default useShopStore;
