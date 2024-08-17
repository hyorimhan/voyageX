'use client';
import { userLoginInfo } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import React, { useEffect } from 'react';

function AuthProvider({ children }: React.PropsWithChildren) {
  const saveUser = useAuthStore((state) => state.saveUser);

  useEffect(() => {
    const loginInfo = async () => {
      const userInfo = await userLoginInfo();
      saveUser(userInfo);
    };
    loginInfo();
  }, []);
  return <>{children}</>;
}

export default AuthProvider;
