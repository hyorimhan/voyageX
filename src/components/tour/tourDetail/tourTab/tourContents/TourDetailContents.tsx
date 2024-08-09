import { propsText } from '@/types/tourPropsType';
import Image from 'next/image';
import React from 'react';

function TourDetailContents({ title, description }: propsText) {
  return (
    <div className='flex'>
      <div className='text-sm mb-2 mt-6 w-[52px] sm:text-xs h-7  bg-primary-100 text-primary-500   items-center justify-center flex rounded-full text-[10px] mr-5'>
        <Image
          src={'/icons/16px/planet.svg'}
          width={16}
          height={16}
          alt='planet'
          layout='intrinsic'
        />
        {title}
      </div>
      <div className='mt-6 text-sm tracking-widest sm:text-xs sm:w-[273px]'>
        {description}
      </div>
    </div>
  );
}

export default TourDetailContents;
