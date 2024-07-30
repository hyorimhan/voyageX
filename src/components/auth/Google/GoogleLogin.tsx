import { signInWithGoogle } from '@/services/auth';
import React from 'react';
import Image from 'next/image';

function GoogleLogin() {
  return (
    <>
      <div className='mx-3.5'>
        <button onClick={signInWithGoogle}>
          <Image
            src={'/images/google.png'}
            alt='gooleIcon'
            width={48}
            height={48}
          />
        </button>
        <div className=' mt-1.5 text-sm text-center '>구글</div>
      </div>
    </>
  );
}

export default GoogleLogin;
