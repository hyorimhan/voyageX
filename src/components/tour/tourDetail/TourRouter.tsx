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
      <div
        className={`sm:mx-5  sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-white mb-4 ${orbitron.className}`}
      >
        TRAVEL PACKAGE
      </div>
    </div>
  );
}

export default TourRouter;
