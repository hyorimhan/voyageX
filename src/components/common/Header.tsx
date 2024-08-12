'use client';
import useAuthStore from '@/zustand/store/useAuth';
import React, { useEffect, useState, useTransition } from 'react';
import { FaBars } from 'react-icons/fa';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';
import { userLoginInfo } from '@/services/auth';
import MyPageIcon24px from './icons/24px/MyPageIcon24px';
import ShoppingBagIcon24px from './icons/24px/ShoppingBagIcon24px';
import HeartDefaultIcon24px from './icons/24px/HeartDefaultIcon24px';
import { usePathname, useRouter } from 'next/navigation';
import Loading from './Loading';
import { orbitron } from '../../../public/fonts/orbitron';
import toast from 'react-hot-toast';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    userLoginInfo().then((res) => {
      saveUser(res.user);
    });
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      {isPending && <Loading />}
      <header className='bg-header-default bg-opacity-60 h-16 flex fixed z-20 top-0 items-center justify-between px-4 w-full mx-auto'>
        <div className='max-w-[1120px] mx-auto flex justify-between items-center w-full'>
          <nav className='hidden lg:flex items-center space-x-5 w-[260px]'>
            <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/tour')}
            >
              여행 상품
            </button>
            <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/shop')}
            >
              굿즈샵
            </button>
            <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/community')}
            >
              자유게시판
            </button>
            <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/address_list')}
            >
              뉴스
            </button>
          </nav>
          <div
            className={`flex items-center justify-center ${orbitron.className}`}
          >
            <button className='text-2xl' onClick={() => handleLinkClick('/')}>
              Voyage X
            </button>
          </div>
          <div className='flex items-center justify-end w-[260px] gap-4'>
            <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/wishlist')}
            >
              <HeartDefaultIcon24px />
            </button>
            <button
              className='hover:text-gray-300'
              onClick={() => handleLinkClick('/mypage/goods_orders')}
            >
              <ShoppingBagIcon24px />
            </button>
            <button
              className='text-white hover:text-gray-300 cursor-pointer'
              onClick={() => {
                toggleMenu;
                handleLinkClick('/mypage/tour_orders');
              }}
            >
              <MyPageIcon24px />
            </button>
            {user ? (
              <LogoutBtn />
            ) : (
              <button
                className='hover:text-gray-300'
                onClick={() => handleLinkClick('/login')}
              >
                <span className=' hover:text-gray-300 w-[50px]'>로그인</span>
              </button>
            )}
            <button onClick={toggleMenu} className='lg:hidden '>
              <FaBars className='w-6 h-6' />
            </button>
          </div>

          {isOpen && (
            <nav className='md:hidden flex flex-col items-center absolute top-16 left-0 w-full bg-header-default bg-opacity-60 space-y-4 py-4'>
              <button
                className='hover:text-gray-300'
                onClick={() => handleLinkClick('/tour')}
              >
                여행 상품
              </button>
              <button
                className='hover:text-gray-300'
                onClick={() => handleLinkClick('/shop')}
              >
                굿즈샵
              </button>
              <button
                className='hover:text-gray-300'
                onClick={() => handleLinkClick('/community')}
              >
                커뮤니티
              </button>
              <button
                className='hover:text-gray-300'
                onClick={() => handleLinkClick('/mypage/tour_orders')}
              >
                마이페이지
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
