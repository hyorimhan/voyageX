'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Goods = {
  id: string;
  goods_img: string;
  goods_name: string;
  pre_price: number;
  goods_price: number;
  discount: number;
  rating_avg: number;
  like_count: number;
};

type GoodsListProps = {
  goods: Goods[];
};

const GoodsList: React.FC<GoodsListProps> = ({ goods }) => {
  return (
    <ul className='grid grid-cols-3 gap-4 p-4 sm:grid-cols-2 sm:gap-2'>
      {goods.map((item, index) => (
        <li
          key={item.id}
          className={`p-4 rounded shadow ${
            index < 1 && 'hidden sm:block'
          } sm:w-full sm:h-auto list-none`}
        >
          <Link href={`shop_detail/${item.id}`} className='flex flex-col'>
            <div>
              <Image
                src={item.goods_img}
                alt={item.goods_name}
                width={320}
                height={360}
                className='object-cover w-full h-72 sm:h-32'
              />
              <div className='mt-4 sm:mt-2'>
                <p className='bg-black-600 text-black-50 text-xs px-2 py-1 rounded-full mb-2 inline-block'>
                  무료 배송
                </p>
                <h2 className='text-base sm:text-xs font-medium text-white break-words'>
                  {item.goods_name}
                </h2>
                <p className='text-black-200 line-through sm:text-xs'>
                  {item.pre_price.toLocaleString()}원
                </p>
                <p className='text-sm sm:text-base sm:font-semibold'>
                  <span className='text-red-500 text-xl'>
                    {item.discount}%
                  </span>{' '}
                  <span className='text-white text-xl'>
                    {item.goods_price.toLocaleString()}원
                  </span>
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <span className='flex items-center'>
                <Image
                  src='/icons/20px/star_true.svg'
                  alt='star icon'
                  width={16}
                  height={16}
                  className='mr-1'
                />
                {Number(item.rating_avg).toFixed(1)}
              </span>
              <span className='flex items-center'>
                <Image
                  src='/icons/20px/heart_default.svg'
                  alt='heart icon'
                  width={16}
                  height={16}
                  className='mr-1'
                />
                {item.like_count}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GoodsList;