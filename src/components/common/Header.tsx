'use client';
import useAuthStore from '@/zustand/store/useAuth';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';

interface LoginInfo {
  user: User | null;
}

const Header = ({ loginInfo }: { loginInfo: LoginInfo }) => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (loginInfo) {
      saveUser(loginInfo.user);
    } else {
      saveUser(null);
    }
  }, [loginInfo, saveUser]);

  return (
    <header className='bg-black bg-opacity-10 h-16 flex fixed z-20 top-0 items-center justify-between px-4 w-full mx-auto '>
      <div className='flex items-center space-x-4 justify-between'>
        <Link href='/'>
          <span className='font-bold text-4xl text-white cursor-pointer'>
            Voyage X
          </span>
        </Link>
      </div>
      <nav className='hidden md:flex items-center space-x-12 text-lg'>
        <Link href='/tour'>
          <span className='text-white hover:text-gray-300 cursor-pointer'>
            여행 상품
          </span>
        </Link>
        <Link href='/shop'>
          <span className='text-white hover:text-gray-300 cursor-pointer'>
            굿즈샵
          </span>
        </Link>
        <Link href='/community'>
          <span className='text-white hover:text-gray-300 cursor-pointer'>
            커뮤니티
          </span>
        </Link>
        <Link href='/address_list'>
          <span className='text-white hover:text-gray-300 cursor-pointer'>
            마이 페이지
          </span>
        </Link>
      </nav>
      <div className='flex items-center space-x-2'>
        <FaUserCircle className='text-white w-6 h-6' />
        {user ? (
          <LogoutBtn />
        ) : (
          <Link href='/login'>
            <span className='text-white hover:text-gray-300 cursor-pointer'>
              로그인
            </span>
          </Link>
        )}
        <button onClick={toggleMenu} className='md:hidden text-white'>
          <FaBars className='w-6 h-6' />
        </button>
      </div>
      {isOpen && (
        <nav className='md:hidden flex flex-col items-center absolute top-16 left-0 w-full bg-black bg-opacity-90 space-y-4 py-4'>
          <Link href='/travel'>
            <span
              className='text-white hover:text-gray-300 cursor-pointer'
              onClick={toggleMenu}
            >
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
    </header>
  );
};

export default Header;
