'use client';
import useAuthStore from '@/zustand/store/useAuth';
import React, { useEffect, useState, useTransition } from 'react';
import { FaBars } from 'react-icons/fa';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';
// import { userLoginInfo } from '@/services/auth';
import MyPageIcon24px from './icons/24px/MyPageIcon24px';
import ShoppingBagIcon24px from './icons/24px/ShoppingBagIcon24px';
import HeartDefaultIcon24px from './icons/24px/HeartDefaultIcon24px';
// import { useRouter } from 'next/navigation';
// import Loading from './Loading';
import { orbitron } from '../../../public/fonts/orbitron';
import Image from 'next/image';
import useLastSelectWishListStore from '@/zustand/store/useLastSelectWishListStore';
import { createClient } from '@/supabase/client';
import Link from 'next/link';
import { userLoginInfo } from '@/services/auth';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition();
  const { setLastSelectTab } = useLastSelectWishListStore((state) => state);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const loginInfo = async () => {
      const userInfo = await userLoginInfo();
      saveUser(userInfo);
    };
    loginInfo();
  }, []);

  return (
    <>
      <header className='bg-header-default  h-16 flex fixed z-20 top-0 items-center justify-between px-4 w-full mx-auto'>
        <div className='max-w-[1120px] mx-auto flex justify-between items-center w-full bg-black-900'>
          <nav className='hidden lg:flex bg-black-900 items-center space-x-5 w-[310px]'>
            <Link href={'/tour'} className='hover:text-gray-300'>
              여행 상품
            </Link>
            <Link href={'/shop'} className='hover:text-gray-300'>
              굿즈샵
            </Link>
            <Link href={'/community'} className='hover:text-gray-300'>
              자유게시판
            </Link>
            {/* <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/address_list')}
            >
              뉴스
            </button> */}
            <Link href={'/about'} className='hover:text-gray-300'>
              ABOUT US
            </Link>
          </nav>
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
          <div className='flex items-center justify-end w-[310px] gap-4'>
            <Link
              href={'/wishlist'}
              className='hover:text-gray-300'
              onClick={() => {
                setLastSelectTab('LikedGoods');
              }}
            >
              <HeartDefaultIcon24px />
            </Link>
            <Link href={'/mypage/goods_orders'} className='hover:text-gray-300'>
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
              <Link href={'/login'} className='hover:text-gray-300'>
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
                href={'mypage/side_bar'}
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
