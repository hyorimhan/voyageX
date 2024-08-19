import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import CloseBlackIcon24px from '@/components/common/icons/24px/CloseBlackIcon24px';
import { orbitron } from '../../../../public/fonts/orbitron';

function TourRouter({ url }: { url: string }) {
  const router = useRouter();
  return (
    <div
      className='text-left'
      onClick={() => {
        router.replace(`${url}`);
      }}
    >
      <div className='-rotate-90 lg:hidden'>
        <Image
          src={'/icons/24px/left_arrow.svg'}
          alt='arrow'
          width={24}
          height={24}
        />
      </div>
      <div
        className={`sm:mx-5  sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-white mb-4 ${orbitron.className}`}
      >
        TRAVEL PACKAGE
      </div>
    </div>
  );
}

export default TourRouter;
