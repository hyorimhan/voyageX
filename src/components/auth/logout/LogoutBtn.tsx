'use client';

import { logout } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function LogoutBtn() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);

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
    router.replace('/');
  };
  return <button onClick={logoutFunc}>로그아웃</button>;
}

export default LogoutBtn;
