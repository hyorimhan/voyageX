'use client';

import { useTransition } from 'react';
import Loading from '../common/Loading';
import MyPageSideBarUserInfo from './MyPageSideBarUserInfo';
import ArrowRightIcon24px from '../common/icons/24px/ArrowRightIcon24px';
import Link from 'next/link';

const MyPageSideBarMobile = () => {
  const [isPending] = useTransition();

  return (
    <div>
      {isPending && <Loading />}
      <div>
        <MyPageSideBarUserInfo />
        <div className='h-[561px] py-9 px-5 w-full'>
          <Link
            href={'/mypage/tour_orders'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>여행상품 주문/배송조회</p>
            <ArrowRightIcon24px />
          </Link>
          <Link
            href={'/mypage/goods_orders'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>굿즈샵 주문/배송조회</p>
            <ArrowRightIcon24px />
          </Link>
          <Link
            href={'/mypage/password_change'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>비밀번호 변경</p>
            <ArrowRightIcon24px />
          </Link>
          <Link
            href={'/mypage/address_list'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>배송지 관리</p>
            <ArrowRightIcon24px />
          </Link>
          <Link
            href={'/mypage/my_posts'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>커뮤니티 작성 글 목록</p>
            <ArrowRightIcon24px />
          </Link>
          <Link
            href={'/wishlist'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>찜 & 장바구니</p>
            <ArrowRightIcon24px />
          </Link>
          <Link
            href={'/mypage/delete_account'}
            className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'
          >
            <p className='text-lg '>회원탈퇴</p>
            <ArrowRightIcon24px />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPageSideBarMobile;
