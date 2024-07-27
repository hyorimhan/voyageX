'use client';
import { signInWithKakao } from '@/services/auth';
import toast from 'react-hot-toast';
import Image from 'next/image';

function KakaoLogin() {
  const kakao = async () => {
    try {
      const { error } = await signInWithKakao();

      if (error) {
        toast('오류가 발생했습니다');
        return;
      }
    } catch (error) {
      console.error('세션 정보를 확인하는 중 오류가 발생했습니다:', error);
    }
  };
  return (
    <>
      <div className='flex justify-center mt-4 w-[469px]'>
        <button onClick={kakao}>
          <Image
            src={'/images/kakaoIcon.png'}
            alt='kakaoIcon'
            width={48}
            height={48}
          />
        </button>
      </div>
      <div className='text-center mt-[6px] w-[469px] text-[14px] text-black-50'>
        카카오
      </div>
    </>
  );
}

export default KakaoLogin;
