'use client';

import { useTransition } from 'react';
import Loading from '../common/Loading';
import { useRouter, usePathname } from 'next/navigation';
import MyPageSideBarUserInfo from './MyPageSideBarUserInfo';

const MyPageSideBar = () => {
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
    <>
      {isPending && <Loading />}
      <div className='w-fit sticky top-0 sm:mx-auto '>
        <MyPageSideBarUserInfo />
        <div className='gap-5 flex flex-col items-start h-[333px] w-[190px] justify-center'>
          <button
            onClick={() => handleLinkClick('/mypage/tour_orders')}
            className={getButtonClassName('/mypage/tour_orders')}
          >
            여행상품 주문/배송조회
          </button>
          <button
            onClick={() => handleLinkClick('/mypage/goods_orders')}
            className={getButtonClassName('/mypage/goods_orders')}
          >
            굿즈샵 주문/배송조회
          </button>
          <button
            onClick={() => handleLinkClick('/mypage/password_change')}
            className={getButtonClassName('/mypage/password_change')}
          >
            비밀번호 변경
          </button>
          <button
            onClick={() => handleLinkClick('/mypage/address_list')}
            className={getButtonClassName('/mypage/address_list')}
          >
            배송지 관리
          </button>
          <button
            onClick={() => handleLinkClick('/mypage/my_posts')}
            className={getButtonClassName('/mypage/my_posts')}
          >
            커뮤니티 작성 글 목록
          </button>
          <button
            onClick={() => handleLinkClick('/wishlist')}
            className={getButtonClassName('/wishlist')}
          >
            찜 & 장바구니
          </button>
          <button
            onClick={() => handleLinkClick('/mypage/delete_account')}
            className={getButtonClassName('/mypage/delete_account')}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPageSideBar;
