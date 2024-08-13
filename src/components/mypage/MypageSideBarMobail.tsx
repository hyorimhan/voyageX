'use client';

import { useTransition } from 'react';
import Loading from '../common/Loading';
import { useRouter, usePathname } from 'next/navigation';
import MyPageSideBarUserInfo from './MyPageSideBarUserInfo';
import ArrowLeftIcon24px from '../common/icons/24px/ArrowLeftIcon24px';
import ArrowRightIcon24px from '../common/icons/24px/ArrowRightIcon24px';
import Link from 'next/link';

const MyPageSideBarMobile = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  const getButtonClassName = (href: string) => {
    const isActive = pathname === href || pathname === `${href}/`;

    return isActive
      ? 'text-sm font-semibold border-b-[1px] text-start'
      : 'text-sm';
  };

  return (
    <div>
      {isPending && <Loading />}
      <div>
        <MyPageSideBarUserInfo />
        <div className='h-[561px] py-9 px-5 w-full'>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/mypage/tour_orders'} className='text-lg '>
              여행상품 주문/배송조회
            </Link>
            <ArrowRightIcon24px />
          </div>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/mypage/goods_orders'} className='text-lg '>
              굿즈샵 주문/배송조회
            </Link>
            <ArrowRightIcon24px />
          </div>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/mypage/password_change'} className='text-lg '>
              비밀번호 변경
            </Link>
            <ArrowRightIcon24px />
          </div>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/mypage/address_list'} className='text-lg '>
              배송지 관리
            </Link>
            <ArrowRightIcon24px />
          </div>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/mypage/my_posts'} className='text-lg '>
              커뮤니티 작성 글 목록
            </Link>
            <ArrowRightIcon24px />
          </div>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/wishlist'} className='text-lg '>
              찜 & 장바구니
            </Link>
            <ArrowRightIcon24px />
          </div>
          <div className='flex h-16 py-5 border-b-[1px] border-black-700 justify-between'>
            <Link href={'/mypage/delete_account'} className='text-lg '>
              회원탈퇴
            </Link>
            <ArrowRightIcon24px />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageSideBarMobile;
