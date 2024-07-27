'use client';

import { useState } from 'react';
import DropDownButton from './DropDownButton';
import Hearts from './Hearts';
import Stars from './Stars';
import Image from 'next/image';
import { useGetOrderedGoods } from '@/hooks/goodsHooks';

function GoodsList() {
  const [sortBy, setSortBy] = useState('like_count');
  const sortByList = [
    'like_count',
    'created_at',
    'goods_price',
    '-goods_price',
    'rating_avg',
    '-rating_avg',
  ];

  const { data: goods, isError, isPending } = useGetOrderedGoods(sortBy);

  console.log(goods);

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;

  return (
    <>
      <div className='flex justify-end'>
        <DropDownButton
          sortByList={sortByList}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <ul className='text-black-50 mb-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {goods.map((item) => (
          <li key={item.id} className='mx-auto my-4 w-full bg-black-1000'>
            <div className='relative'>
              <Image
                src={item.goods_img}
                alt={item.description}
                width={268}
                height={272}
                className='rounded-lg w-full h-72 object-cover'
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='p-2'>
              <p className='flex justify-start text-base'>{item.goods_name}</p>
              <div className='flex flex-row'>
                <p className='text-red-600 text-xl mr-2'>10%</p>
                <p className='flex justify-center text-xl'>{`${item.goods_price.toLocaleString()}원`}</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-2'>
                  <Stars ratingAvg={item.rating_avg} />
                  <div className='bg-black-600 rounded-xl text-xs p-1.5'>
                    무료배송
                  </div>
                </div>
                <Hearts />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GoodsList;
