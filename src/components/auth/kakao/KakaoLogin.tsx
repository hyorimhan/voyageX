'use client';
import { signInWithKakao, userLoginInfo } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function KakaoLogin() {
  const saveUser = useAuthStore((state) => state.saveUser);

  // const router = useRouter();
  const kakao = async () => {
    try {
      const { error } = await signInWithKakao();
      const userInfo = await userLoginInfo();
      console.log(userInfo);

      if (error) {
        toast('오류가 발생했습니다');
        return;
      }
      if (userInfo.user) {
        saveUser(userInfo.user);
        toast('로그인 되었습니다');
        console.log(userInfo);
        // router.push('/');
      } else {
        toast('사용자 정보를 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('세션 정보를 확인하는 중 오류가 발생했습니다:', error);
    }
  };
  return <button onClick={kakao}>카카오</button>;
}

export default KakaoLogin;
