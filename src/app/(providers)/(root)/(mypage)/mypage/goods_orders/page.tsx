'use client';

import ReviewFormModal from '@/components/mypage/goods_orders/ReviewFormModal';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const GoodsOrdersPage = () => {
  const [showReviewFormAddModal, setShowReviewFormAddModal] =
    useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const goodsId = '2d0505e5-b4a9-4954-bb0b-7913af96ab75';

  return (
    <div>
      <p className='text-2xl mb-9'>굿즈샵 주문/배송조회</p>
      <div>
        <div className='flex text-lg mt-3 '>
          <p className='flex justify-end w-96 ml-4'>상품정보</p>
          <div className='flex w-full gap-[48px] justify-end mr-8'>
            <p>배송비</p>
            <p>진행상태</p>
            <p>리뷰</p>
          </div>
        </div>
        <div className='border-b-2 border-solid border-white mt-3'></div>
      </div>
      <div className='py-4'>
        <div className='flex justify-between'>
          <p>주문일자 2024. 07. 12</p>
          <button className='flex items-center'>
            <Link href={'/mypage/goods_orders/detail'}>상세정보</Link>
            <MdOutlineKeyboardArrowRight className='text-2xl' />
          </button>
        </div>
        <div className='border-b-2 border-solid border-black-700 mt-3 mb-6'></div>
        <div className='flex justify-between'>
          <div className='flex gap-5 mt-2'>
            <Image
              src='/images/goodsItem.svg'
              alt='goodsItem'
              width={100}
              height={100}
            />
            <div className='gap-2 flex flex-col'>
              <p>New Glenn Technical Tee</p>
              <p className='font-bold text-2xl'>52,000원</p>
              <p>수량 1개</p>
            </div>
          </div>
          <div className='flex items-center gap-7 justify-end mr-[10px]'>
            <div className='flex flex-row gap-[46px]'>
              <p>무료배송</p>
              <p>구매확정</p>
            </div>
            <button
              className='bg-primary-400 p-2 rounded-md'
              onClick={() => setShowReviewFormAddModal(true)}
            >
              리뷰작성
            </button>
          </div>
        </div>
        <div className='border-b-2 border-solid border-black-500 mt-9'></div>
      </div>
      {showReviewFormAddModal && user && (
        <ReviewFormModal
          goodsId={goodsId}
          userId={user?.id}
          onClose={() => setShowReviewFormAddModal(false)}
        />
      )}
    </div>
  );
};

export default GoodsOrdersPage;
