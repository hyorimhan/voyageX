'use client';

import LikedGoods from './LikedGoods';
import useAuthStore from '@/zustand/store/useAuth';
import MyCart from './my_cart/MyCart';
import useLastSelectWishListStore from '@/zustand/store/useLastSelectWishListStore';

function TabSelector() {
  const { lastSelectTab, setLastSelectTab } = useLastSelectWishListStore();
  const user = useAuthStore((state) => state.user);
  const user_id = user?.id;
  return (
    <>
      <div className='flex flex-col sm:max-w-[768px] lg:min-w-[768px] text-black-50'>
        <div className='grid grid-cols-2'>
          <button
            onClick={() => {
              setLastSelectTab('LikedGoods');
            }}
            className='text-lg w-full font-semibold h-[53px]'
          >
            찜
          </button>
          <button
            onClick={() => {
              setLastSelectTab('MyCart');
            }}
            className='text-lg font-semibold w-full h-[53px]'
          >
            장바구니
          </button>
        </div>
        <div className='flex w-full'>
          <div
            className={`flex w-1/2  ${
              lastSelectTab === 'LikedGoods'
                ? 'border-b-2 border-white'
                : 'border-b-[1px]'
            }`}
          ></div>
          <div
            className={`flex w-1/2  ${
              lastSelectTab === 'MyCart'
                ? 'border-b-2 border-white'
                : 'border-b-[1px]'
            }`}
          ></div>
        </div>
      </div>
      {lastSelectTab === 'LikedGoods' ? (
        <LikedGoods user_id={user_id!} />
      ) : (
        <MyCart user_id={user_id!} />
      )}
    </>
  );
}

export default TabSelector;
