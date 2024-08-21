'use client';

import { logout } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import toast from 'react-hot-toast';
import { orbitron } from '../../../../public/fonts/orbitron';
import { useRouter } from 'next/navigation';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import usePayResultStore from '@/zustand/store/usePayResultStore';

function SideBarLogoutBtn() {
  const router = useRouter();
  const { user, saveUser } = useAuthStore();
  const { setUpdateInfo } = useUpdateInfoStore();
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
  return (
    <button
      onClick={logoutFunc}
      className={`${
        user ? 'flex' : 'hidden'
      } mt-9 w-full text-white text-base font-semibold justify-center items-center py-3 border-[1.5px] rounded-lg border-primary-400 bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300 ${
        orbitron.className
      }`}
    >
      LOG OUT
    </button>
  );
}

export default SideBarLogoutBtn;
