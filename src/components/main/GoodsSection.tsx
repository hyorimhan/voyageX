import React from 'react';
import Link from 'next/link';
import { getGoods } from '@/services/goods';
import GoodsList from './GoodsList';
import { orbitron } from '../../../public/fonts/orbitron';

export default async function GoodsSection() {
  const goods = await getGoods('latest');

  return (
    <section className='section section-bg  min-h-screen flex flex-col items-center justify-center transition-opacity duration-500'>
      <div className='w-full max-w-[1120px] mx-auto relative px-4'>
        <h1
          className={`text-4xl absolute font-semibold top-40 left-20 ${orbitron.className} transition-opacity duration-500 opacity-100
    sm:text-2xl sm:font-medium sm:top-16 sm:left-4`}
        >
          GOODS SHOP
        </h1>
        <Link href='/shop'>
          <p
            className={`absolute top-48 right-20 underline transition-opacity duration-500 opacity-100 sm:top-16 sm:right-4`}
          >
            MORE+
          </p>
        </Link>

        <GoodsList goods={goods.slice(0, 4)} />
      </div>
    </section>
  );
}
