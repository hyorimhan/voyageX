'use client';
import { signInWithKakao } from '@/services/auth';
import Image from 'next/image';

function KakaoLogin() {
  return (
    <>
      <div className='mx-3.5'>
        <button onClick={signInWithKakao}>
          <Image
            src={'/images/kakaoIcon.png'}
            alt='kakaoIcon'
            width={48}
            height={48}
          />
        </button>

        <div className='mt-1.5 text-sm text-center'>카카오</div>
      </div>
    </>
  );
}

export default KakaoLogin;
