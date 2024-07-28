import { tourDetail } from '@/services/tour';
import { tourProps } from '@/types/tourPropsType';
import React from 'react';

async function Payment({ params }: tourProps) {
  const { id } = params;
  const { tours, error } = await tourDetail(id);

  return (
    <>
      <div className='border-b-[1px] mt-[132px] pb-[12px] text-[28px]'>
        여행상품 결제
      </div>
    </>
  );
}

export default Payment;
