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
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/services/community';
import { getLikeLength } from '@/services/mypage';
import SideBarLogoutBtn from '../auth/logout/SideBarLogoutBtn';
import ArrowRightIcon24px from './icons/24px/ArrowRightIcon24px';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setLastSelectTab } = useLastSelectWishListStore((state) => state);
  const [likeCount, setLikeCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user?.id) {
      getLikeLength(user.id).then((data) => {
        const totalLikedItems = data.totalLikedItems || 0;
        setLikeCount(totalLikedItems);
      });
    }
  }, [user?.id]);

  const { data: posts } = useQuery({
    queryKey: ['myPosts', user?.id],
    queryFn: () => getMyPosts(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const postCount = posts?.length || 0;
  const emailId = user?.email ? user.email.split('@')[0] : '비회원';

  return (
    <>
      <header className='bg-header-default h-16 flex fixed z-20 top-0 items-center justify-between px-4 w-full mx-auto'>
        <div className='max-w-[1120px] mx-auto flex justify-between items-center w-full'>
          <div
            className={`flex items-center justify-center sm:w-[104px] sm:justify-start `}
          >
            <Link href={'/'} className='sm:hidden'>
              <Image
                src={'/icons/logo/textlogo.svg'}
                alt='voyage_x_logo'
                width={200}
                height={150}
              />
            </Link>
            <Link href={'/'} className='lg:hidden'>
              <Image
                src={'/icons/logo/mobileLogo.svg'}
                alt='voyage_x_logo'
                width={30}
                height={30}
              />
            </Link>
          </div>
          <nav className='hidden md:flex lg:flex items-center justify-center space-x-7 w-[390px]'>
            <Link href={'/tour'} className='text-white hover:text-gray-300'>
              여행 상품
            </Link>
            <Link href={'/shop'} className='text-white hover:text-gray-300'>
              굿즈샵
            </Link>
            <Link
              href={'/community'}
              className='text-white hover:text-gray-300'
            >
              자유게시판
            </Link>
            <Link href={'/news'} className='text-white hover:text-gray-300'>
              뉴스
            </Link>
            <Link href={'/about'} className='text-white hover:text-gray-300'>
              ABOUT US
            </Link>
          </nav>

          <div className='flex items-center justify-end gap-4'>
            <Link
              href={'/wishlist'}
              className='text-white hover:text-gray-300 md:block sm:hidden'
              onClick={() => setLastSelectTab('LikedGoods')}
            >
              <HeartDefaultIcon24px />
            </Link>
            <Link
              href={'/wishlist'}
              className='text-white hover:text-gray-300'
              onClick={() => setLastSelectTab('MyCart')}
            >
              <ShoppingBagIcon24px />
            </Link>
            <Link
              href={'/mypage/tour_orders'}
              className='text-white hover:text-gray-300 cursor-pointer sm:hidden'
            >
              <MyPageIcon24px />
            </Link>
            <Link
              href={'/mypage/side_bar'}
              className='text-white hover:text-gray-300 cursor-pointer md:hidden lg:hidden'
            >
              <MyPageIcon24px />
            </Link>

            <div className='sm:hidden'>
              {user ? (
                <LogoutBtn />
              ) : (
                <Link
                  href={'/login'}
                  className='text-white hover:text-gray-300'
                >
                  <span className='hover:text-gray-300 w-[50px]'>로그인</span>
                </Link>
              )}
            </div>
            <button
              onClick={toggleMenu}
              className='text-white lg:hidden md:hidden'
            >
              {/* <FaBars className='w-6 h-6 ' /> */}
              <Image
                src={'/icons/hbg.svg'}
                alt='voyage_x_logo'
                width={24}
                height={24}
                className='w-6 h-6 cursor-pointer'
              />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className='fixed inset-0 bg-black-1000 z-50 overflow-y-auto'>
          <div className='flex flex-col h-full p-4'>
            <div className='flex justify-between items-center mb-8'>
              <Image
                src={'/icons/logo/textlogo.svg'}
                alt='voyage_x_logo'
                width={150}
                height={40}
              />
              <button onClick={toggleMenu} className='text-white text-3xl'>
                &times;
              </button>
            </div>

            {user ? (
              <div className={`text-white mb-8 ${orbitron.className}`}>
                <h2 className='text-2xl font-bold mb-2'>{emailId}</h2>
                <div className='flex flex-row items-center text-xs gap-2'>
                  <Link
                    href={'/mypage/my_posts'}
                    className='flex gap-1 text-center'
                  >
                    <p>작성글 수</p>
                    <p>{postCount}</p>
                  </Link>
                  <p>|</p>
                  <Link
                    href={'/wishlist'}
                    className='flex gap-1 text-center'
                    onClick={() => setLastSelectTab('LikedGoods')}
                  >
                    🤍<p>{likeCount}</p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className='flex gap-4 mb-8'>
                <Link
                  href='/signup'
                  className={`border border-primary-400 bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300 text-black-50 px-6 py-2 rounded w-1/2 font-bold text-center ${orbitron.className}`}
                  onClick={() => setIsOpen(false)}
                >
                  SIGN UP
                </Link>
                <Link
                  href='/login'
                  className={`bg-primary-600 duration-200 hover:bg-primary-400 active:bg-primary-500 text-black-50 px-6 py-2 rounded w-1/2 font-bold text-center ${orbitron.className}`}
                  onClick={() => setIsOpen(false)}
                >
                  LOG IN
                </Link>
              </div>
            )}

            <nav className='flex flex-col gap-4'>
              <Link
                href={'/shop'}
                className={`text-white text-xl flex justify-between items-center py-5 border-b border-gray-700 ${orbitron.className}`}
                onClick={() => setIsOpen(false)}
              >
                GOODS SHOP
                <ArrowRightIcon24px />
              </Link>
              <Link
                href={'/tour'}
                className={`text-white text-xl flex justify-between items-center py-5 border-b border-gray-700 ${orbitron.className}`}
                onClick={() => setIsOpen(false)}
              >
                TRAVEL PACKAGE
                <ArrowRightIcon24px />
              </Link>
              <Link
                href={'/community'}
                className={`text-white text-xl flex justify-between items-center py-5 border-b border-gray-700 ${orbitron.className}`}
                onClick={() => setIsOpen(false)}
              >
                FREE BOARD
                <ArrowRightIcon24px />
              </Link>
              <Link
                href={'/news'}
                className={`text-white text-xl flex justify-between items-center py-5 border-b border-gray-700 ${orbitron.className}`}
                onClick={() => setIsOpen(false)}
              >
                NEWS
                <ArrowRightIcon24px />
              </Link>
              <Link
                href={'/mypage/side_bar'}
                className={`text-white text-xl flex justify-between items-center py-5 border-b border-gray-700 ${orbitron.className}`}
                onClick={() => setIsOpen(false)}
              >
                MY PAGE
                <ArrowRightIcon24px />
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
