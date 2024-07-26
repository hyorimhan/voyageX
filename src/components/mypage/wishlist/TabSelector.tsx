'use client';

import { useState } from 'react';
import LikedGoods from './LikedGoods';
import MyCart from './MyCart';

function TabSelector() {
  const [selectedTab, setSelectedTab] = useState('LikedGoods');
  return (
    <>
      <div className='flex flex-row justify-evenly w-full mb-8 border-b-2 border-white'>
        <div
          className={`w-1/2 flex justify-center ${
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
          className={`w-1/2 flex justify-center ${
            selectedTab === 'MyCart' ? 'border-b-4 border-white' : 'border-none'
          }`}
        >
          <button onClick={() => setSelectedTab('MyCart')} className='text-lg'>
            장바구니
          </button>
        </div>
      </div>
      {selectedTab === 'LikedGoods' ? <LikedGoods /> : <MyCart />}
    </>
  );
}

export default TabSelector;
