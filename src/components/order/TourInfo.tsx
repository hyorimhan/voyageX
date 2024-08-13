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
      <div className='py-4 mb-4 border-b border-black-700 font-medium flex flex-row items-start gap-2'>
        <span className='text-xl'>주문상품 정보</span>
        <span className='text-xl'>{' | '}</span>
        <span className='text-lg'>총 1개</span>
      </div>
      <div>
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
            <p className='text-sm'>6박 7일 패키지</p>
            <p className='font-semibold text-lg'>{`${tourOrder?.planet_name} ${tourOrder?.eng_name}`}</p>
            <div className='flex flex-row gap-2 sm:w-full'>
              <p>{`${tourOrder?.price.toLocaleString()}원`}</p>
              <p>{' | '}</p>
              <p>수량 1개</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourInfo;
