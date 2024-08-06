'use client';

import { useState } from 'react';
import LikedGoods from './LikedGoods';
import useAuthStore from '@/zustand/store/useAuth';
import MyCart from './my_cart/MyCart';

function TabSelector() {
  const [selectedTab, setSelectedTab] = useState('LikedGoods');
  const user = useAuthStore((state) => state.user);
  const user_id = user?.id;
  return (
    <>
      <div className='flex flex-row justify-evenly w-full mb-8 border-b-2 border-white text-black-50'>
        <div
          className={`w-1/2 flex justify-center pb-1 ${
            selectedTab === 'LikedGoods'
              ? 'border-b-4 border-white'
              : 'border-none'
          }`}
        >
          <button
            onClick={() => setSelectedTab('LikedGoods')}
            className='text-lg'
          >
            찜
          </button>
        </div>
        <div
          className={`w-1/2 flex justify-center pb-1 ${
            selectedTab === 'MyCart' ? 'border-b-4 border-white' : 'border-none'
          }`}
        >
          <button onClick={() => setSelectedTab('MyCart')} className='text-lg'>
            장바구니
          </button>
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
