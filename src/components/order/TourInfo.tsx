'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import Link from 'next/link';

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
    <div className='border-[1px] border-black-300 rounded-lg sm:p-4 md:pt-4 md:px-5 md:pb-5 lg:pt-4 lg:px-5 lg:pb-5 text-black-50'>
      <div className='pt-1 pb-3 h-[50px] mb-4 border-b border-black-700 font-medium flex flex-row items-start gap-2'>
        <span className='text-xl'>주문상품 정보</span>
        <span className='text-xl'>{' | '}</span>
        <span className='text-lg'>총 1개</span>
      </div>
      <div>
        <Link href={`/tour/${tourOrder?.tour_id}`}>
          <div className='flex items-center justify-start gap-[18px]'>
            <div className='w-[104px] h-[104px]'>
              <Image
                src={tourOrder?.planet_img!}
                alt={tourOrder?.planet_name!}
                width={104}
                height={104}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm'>6박 7일 패키지</p>
                <p className='font-semibold text-lg'>{`${tourOrder?.planet_name} ${tourOrder?.eng_name}`}</p>
              </div>
              <div className='flex flex-row gap-2 sm:w-full'>
                <p>{`${tourOrder?.price.toLocaleString()}원`}</p>
                <p>{' | '}</p>
                <p>수량 1개</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TourInfo;
