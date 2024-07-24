'use client';

import { logout } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function LogoutBtn() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logoutFunc = async () => {
    const response = await logout();
    if (!user) {
      toast('이미 로그아웃 되었습니다');
      return;
    }
    if (response.message) {
      toast(response.message);
    }
    const userInfo = useAuthStore.getState().userInfo;
    userInfo(null);
    router.replace('/');
  };
  return <button onClick={logoutFunc}>로그아웃</button>;
}

export default LogoutBtn;
