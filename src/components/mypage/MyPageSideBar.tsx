'use client';

import useAuthStore from '@/zustand/store/useAuth';
import Link from 'next/link';
import { IoMdHeart } from 'react-icons/io';

const MyPageSideBar = () => {
  const user = useAuthStore((state) => state.user);
  const emailId = user?.email ? user.email.split('@')[0] : '비회원';

  return (
    <div className='w-fit sticky top-0 p-5'>
      <div className='mb-10'>
        <p className='text-2xl'>{emailId}</p>
        <p className='flex flex-row items-center'>
          작성글 수 5 |<IoMdHeart className='ml-1' /> 35
        </p>
      </div>
      <div className='gap-3 flex flex-col'>
        <Link href={'/tour_orders'}>여행상품 주문/배송조회</Link>
        <Link href={'/goods_orders'}>굿즈샵 주문/배송조회</Link>
        <Link href={'/password_change'}>비밀번호 변경</Link>
        <Link href={'/address_list'}>배송지 관리</Link>
        <Link href={'/my_posts'}>커뮤니티 작성 글 목록</Link>
        <Link href={'/wishlist'}>찜 & 장바구니</Link>
        <Link href={'/'}>회원탈퇴</Link>
      </div>
    </div>
  );
};

export default MyPageSideBar;
