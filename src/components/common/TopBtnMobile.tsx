import Image from 'next/image';
// import { useEffect, useState } from 'react';

interface topBtnProps {
  size: number;
}

function TopBtnMobile({ size }: topBtnProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='w-full flex justify-center mt-8 mb-4 lg:hidden'>
      <button onClick={scrollToTop} className=' animate-bounce z-50 '>
        <Image
          src={'/icons/logo/logo1.svg'}
          alt='voyage_x_logo'
          width={size}
          height={size}
        />
      </button>
    </div>
  );
}
export default TopBtnMobile;
