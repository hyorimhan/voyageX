import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import CloseBlackIcon24px from '@/components/common/icons/24px/CloseBlackIcon24px';
import { orbitron } from '../../../../public/fonts/orbitron';
import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';

function TourRouter({ url }: { url: string }) {
  const router = useRouter();
  return (
    <div
      className='text-left'
      onClick={() => {
        router.replace(`${url}`);
      }}
    >
      <div className='flex items-center mb-4 gap-4 mt-[100px]'>
        <div className='md:hidden lg:hidden'>
          <ArrowLeftIcon24px />
        </div>
        <div
          className={` md:text-4xl lg:text-4xl font-semibold text-white sm:text-xl ${orbitron.className}`}
        >
          TRAVEL PACKAGE
        </div>
      </div>
    </div>
  );
}

export default TourRouter;
