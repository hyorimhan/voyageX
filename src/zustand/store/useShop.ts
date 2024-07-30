import { Order } from '@/components/pay/PaymentWidget';
import { create } from 'zustand';

type userOrderType = {
  userOrder: Order | null;
  orderType: string | null;
  saveOrder: (info: Order) => string | void;
  setOrderType: (type: string) => void;
};

const useShopStore = create<userOrderType>((set) => ({
  userOrder: null,
  orderType: null,
  saveOrder: (info) => set({ userOrder: info }),
  setOrderType: (type) => set({ orderType: type }),
}));
export default useShopStore;
