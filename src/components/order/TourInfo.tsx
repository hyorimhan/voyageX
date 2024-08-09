'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';

interface TourInfoPropsType {
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

function TourInfo({ setTotalPrice }: TourInfoPropsType) {
  const router = useRouter();
  const { tourOrder } = useTourOrderInfoStore((state) => state);
  useEffect(() => {
    if (!tourOrder) {
      toast.error('여행 상품을 다시 선택해주세요');
      return router.back();
    }
    setTotalPrice(tourOrder.price);
  });

  return (
    <div className='border-[1px] border-black-300 p-4 rounded-lg mb-8 text-black-50'>
      <div className='py-4 mb-4 border-b border-black-700'>
        <span className='text-xl'>여행상품 정보</span>
      </div>
      <div className='grid grid-cols-[minmax(0,1fr)_100px]'>
        <div className='flex items-center justify-start gap-4'>
          <div className='w-20 h-24 mt-4'>
            <Image
              src={tourOrder?.planet_img!}
              alt={tourOrder?.planet_name!}
              width={80}
              height={96}
            />
          </div>
          <div>
            <p>{`${tourOrder?.planet_name} ${tourOrder?.eng_name}`}</p>
            <div className='sm:text-xs'>{tourOrder?.depart_date} ~</div>
          </div>
        </div>
        <div className='border-l border-black-300 flex flex-col items-center justify-center'>
          <p>{`${tourOrder?.price.toLocaleString()}원`}</p>
        </div>
      </div>
    </div>
  );
}

export default TourInfo;
