import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function TourRouter({ url }: { url: string }) {
  const router = useRouter();
  return (
    <div
      className='flex lg:justify-center lg:items-center cursor-pointer sm:ml-5 md:ml-5'
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
      <div>Travel Package</div>
    </div>
  );
}

export default TourRouter;
