'use client';

import { useState } from 'react';
import LikedGoods from './LikedGoods';
import useAuthStore from '@/zustand/store/useAuth';
import MyCart from './my_cart/MyCart';

function TabSelector() {
  const [selectedTab, setSelectedTab] = useState('LikedGoods');
  const user = useAuthStore((state) => state.user);
  const user_id = user?.id;
  console.log(user_id);
  return (
    <>
      <div className='flex flex-col w-full text-black-50'>
        <div className='flex'>
          <button
            onClick={() => setSelectedTab('LikedGoods')}
            className='text-lg w-full font-semibold h-[53px]'
          >
            찜
          </button>
          <button
            onClick={() => setSelectedTab('MyCart')}
            className='text-lg font-semibold w-full  h-[53px]'
          >
            장바구니
          </button>
        </div>
        <div className='flex w-full'>
          <div
            className={`flex w-1/2  ${
              selectedTab === 'LikedGoods'
                ? 'border-b-2 border-white'
                : 'border-b-[1px]'
            }`}
          ></div>
          <div
            className={`flex w-1/2  ${
              selectedTab === 'MyCart'
                ? 'border-b-2 border-white'
                : 'border-b-[1px]'
            }`}
          ></div>
        </div>
      </div>
      {selectedTab === 'LikedGoods' ? (
        <LikedGoods user_id={user_id!} />
      ) : (
        <MyCart user_id={user_id!} />
      )}
    </>
  );
}

export default TabSelector;
