import { signInWithGoogle } from '@/services/auth';
import React from 'react';
import Image from 'next/image';

function GoogleLogin() {
  return (
    <>
      <div className='mx-[13.5px]'>
        <button onClick={signInWithGoogle}>
          <Image
            src={'/images/google.png'}
            alt='gooleIcon'
            width={48}
            height={48}
          />
        </button>
        <div className=' mt-[6px] text-[14px] text-center '>구글</div>
      </div>
    </>
  );
}

export default GoogleLogin;
