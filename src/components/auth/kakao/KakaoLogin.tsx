'use client';
import { signInWithKakao } from '@/services/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function KakaoLogin() {
  const router = useRouter();
  const kakao = async () => {
    try {
      const { error } = await signInWithKakao();

      if (error) {
        toast('오류가 발생했습니다');
        return;
      }
      toast('로그인 되었습니다');
      router.push('/');
    } catch (error) {
      toast('오류가 발생했습니다');
    }
  };
  return <button onClick={kakao}>카카오</button>;
}

export default KakaoLogin;
