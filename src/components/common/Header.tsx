'use client';
import useAuthStore from '@/zustand/store/useAuth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';
import { userLoginInfo } from '@/services/auth';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    userLoginInfo().then((res) => {
      saveUser(res.user);
    });
  }, []);

  return (
    <header className='bg-header-default bg-opacity-60 h-16 flex fixed z-20 top-0 items-center justify-between px-4 w-full mx-auto '>
      <div className='max-w-[1120px] mx-auto flex justify-between items-center w-full '>
        <nav className='hidden md:flex items-center space-x-5 w-[260px]'>
          <Link href='/tour'>
            <span className=' hover:text-gray-300'>여행 상품</span>
          </Link>
          <Link href='/shop'>
            <span className=' hover:text-gray-300 '>굿즈샵</span>
          </Link>
          <Link href='/community'>
            <span className=' hover:text-gray-300 '>자유게시판</span>
          </Link>
          <Link href='/address_list'>
            <span className=' hover:text-gray-300 '>뉴스</span>
          </Link>
        </nav>
        <div className='flex items-center justify-center '>
          <Link href='/'>
            <span className='font-bold text-2xl '>Voyage X</span>
          </Link>
        </div>
        <div className='flex items-center justify-end space-x-2 w-[260px]'>
          <Link href='/mypage'>
            <FaUserCircle className=' w-6 h-6 ' />
          </Link>
          {user ? (
            <LogoutBtn />
          ) : (
            <Link href='/login'>
              <span className=' hover:text-gray-300 '>로그인</span>
            </Link>
          )}
          <button onClick={toggleMenu} className='md:hidden '>
            <FaBars className='w-6 h-6' />
          </button>
        </div>
        {isOpen && (
          <nav className='md:hidden flex flex-col items-center absolute top-16 left-0 w-full bg-header-default bg-opacity-60 space-y-4 py-4'>
            <Link href='/travel'>
              <span className=' hover:text-gray-300 ' onClick={toggleMenu}>
                여행 상품
              </span>
            </Link>
            <Link href='/goodsShop'>
              <span
                className='text-white hover:text-gray-300 cursor-pointer'
                onClick={toggleMenu}
              >
                굿즈샵
              </span>
            </Link>
            <Link href='/community'>
              <span
                className='text-white hover:text-gray-300 cursor-pointer'
                onClick={toggleMenu}
              >
                커뮤니티
              </span>
            </Link>
            <Link href='/mypage'>
              <span
                className='text-white hover:text-gray-300 cursor-pointer'
                onClick={toggleMenu}
              >
                마이 페이지
              </span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
