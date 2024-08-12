'use client';

import { useState } from 'react';
import DropDownButton from './DropDownButton';
import useAuthStore from '@/zustand/store/useAuth';
import Loading from '../common/Loading';
import { useGetOrderedGoods } from '@/hooks/apis/goods.api';
import GoodsItem from './GoodsItem';
import { shopCategories } from '@/constants/shop';

function GoodsList() {
  const user = useAuthStore((state) => state.user);
  const [sortBy, setSortBy] = useState('like_count');
  const { data: goods, isError, isPending } = useGetOrderedGoods(sortBy);

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;

  return (
    <>
      <div className='flex justify-end mt-5'>
        <DropDownButton
          categories={shopCategories}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <ul className='text-black-50 mb-4 sm:mx-5 grid gap-x-4 gap-y-8 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {goods?.map((item) => (
          <GoodsItem key={item.id} item={item} user_id={user?.id} />
        ))}
      </ul>
    </>
  );
}

export default GoodsList;
