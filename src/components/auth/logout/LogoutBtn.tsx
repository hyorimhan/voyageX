'use client';

import { logout } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import usePayResultStore from '@/zustand/store/usePayResultStore';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function LogoutBtn() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const { setUpdateInfo } = useUpdateInfoStore((state) => state);
  const { setExpressAddress } = useExpressInfoStore();
  const { setGoodsOrderInfo } = useGoodsOrderStore();
  const { setTourOrder } = useTourOrderInfoStore();
  const { setPayResult } = usePayResultStore();

  const logoutFunc = async () => {
    if (!user) {
      toast.error('이미 로그아웃 되었습니다');
      return;
    }
    const response = await logout();
    if (response.message) {
      toast.success(response.message);
    }

    saveUser(null);
    setUpdateInfo({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
    });
    setExpressAddress(null);
    setGoodsOrderInfo(null);
    setTourOrder(null);
    setPayResult(null);

    router.replace('/');
  };
  return <button onClick={logoutFunc}>로그아웃</button>;
}

export default LogoutBtn;
