import Image from 'next/image';
import React from 'react';

const GoodsOrdersDetailPage = () => {
  return (
    <div>
      <p className='text-2xl mb-4'>주문상세내역</p>
      <div className='flex gap-8'>
        <div className='flex gap-2'>
          <p>주문일자</p>
          <p>2024 .07 .18</p>
        </div>
        <div className='flex gap-2'>
          <p>주문번호</p>
          <p>283749274839</p>
        </div>
      </div>
      <div className='border-b-2 border-solid border-white mt-14'></div>
      <div className='border-2 border-white p-5 rounded-lg mt-14'>
        <div className='flex gap-[10px]'>
          <p>주문상품 정보 </p>
          <p>총 1개</p>
        </div>
        <div className='border-b-2 border-solid border-black-700 mt-3'></div>
        <div className='mt-4 flex'>
          <Image
            src='/images/goodsItem.svg'
            alt='goodsItem'
            height={50}
            width={104}
          />
          <div className='ml-[18px]'>
            <p>우주</p>
            <p>New Glenn Technical Tee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsOrdersDetailPage;
