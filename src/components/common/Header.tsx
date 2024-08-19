'use client';
import useAuthStore from '@/zustand/store/useAuth';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';
import MyPageIcon24px from './icons/24px/MyPageIcon24px';
import HeartDefaultIcon24px from './icons/24px/HeartDefaultIcon24px';
import { orbitron } from '../../../public/fonts/orbitron';
import Image from 'next/image';
import useLastSelectWishListStore from '@/zustand/store/useLastSelectWishListStore';
import Link from 'next/link';

import ShoppingBagIcon24px from './icons/24px/ShoppingBagIcon24px';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setLastSelectTab } = useLastSelectWishListStore((state) => state);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className='bg-header-default  h-16 flex fixed z-20 top-0 items-center justify-between px-4 w-full mx-auto'>
        <div className='max-w-[1120px] mx-auto flex justify-between items-center w-full bg-black-900'>
          <div
            className={`flex items-center justify-center ${orbitron.className}`}
          >
            <Link href={'/'}>
              <Image
                src={'/icons/logo/logo3.svg'}
                alt='voyage_x_logo'
                width={200}
                height={150}
              />
            </Link>
          </div>
          <nav className='hidden lg:flex bg-black-900 items-center justify-center space-x-7 w-[390px]'>
            <Link href={'/tour'} className='hover:text-gray-300'>
              여행 상품
            </Link>
            <Link href={'/shop'} className='hover:text-gray-300'>
              굿즈샵
            </Link>
            <Link href={'/community'} className='hover:text-gray-300'>
              자유게시판
            </Link>
            <Link href={'/news'} className='hover:text-gray-300'>
              뉴스
            </Link>
            <Link href={'/about'} className='hover:text-gray-300'>
              ABOUT US
            </Link>
          </nav>

          <div className='flex items-center justify-end  gap-4'>
            <Link
              href={'/wishlist'}
              className='hover:text-gray-300'
              onClick={() => {
                setLastSelectTab('LikedGoods');
              }}
            >
              <HeartDefaultIcon24px />
            </Link>
            <Link
              href={'/wishlist'}
              className='hover:text-gray-300'
              onClick={() => setLastSelectTab('MyCart')}
            >
              <ShoppingBagIcon24px />
            </Link>
            <Link
              href={'/mypage/tour_orders'}
              className='text-white hover:text-gray-300 cursor-pointer'
              onClick={() => {
                toggleMenu;
              }}
            >
              <MyPageIcon24px />
            </Link>
            {user ? (
              <LogoutBtn />
            ) : (
              <Link
                href={'/login'}
                // onClick={() => handleLoginClick('/login')}
                className='hover:text-gray-300'
              >
                <span className=' hover:text-gray-300 w-[50px]'>로그인</span>
              </Link>
            )}
            <button onClick={toggleMenu} className='lg:hidden '>
              <FaBars className='w-6 h-6' />
            </button>
          </div>

          {isOpen && (
            <nav className='md:hidden flex flex-col items-center absolute top-16 left-0 w-full bg-header-default bg-opacity-60 space-y-4 py-4'>
              <Link href={'/tour'} className='hover:text-gray-300'>
                여행 상품
              </Link>
              <Link href={'/shop'} className='hover:text-gray-300'>
                굿즈샵
              </Link>
              <Link href={'/community'} className='hover:text-gray-300'>
                커뮤니티
              </Link>
              <Link
                href={'/mypage/tour_orders'}
                className='hover:text-gray-300 sm:hidden'
              >
                마이페이지
              </Link>
              <Link
                href={'/mypage/side_bar'}
                className='hover:text-gray-300 md:hidden lg:hidden'
              >
                마이페이지
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
