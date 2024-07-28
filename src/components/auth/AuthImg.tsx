import React from 'react';
import Image from 'next/image';

function AuthImg() {
  return (
    <div>
      <Image src={'/images/auth.png'} alt='auth' width={402} height={402} />
    </div>
  );
}

export default AuthImg;
