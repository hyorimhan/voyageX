'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MinusIcon20px from '@/components/common/icons/20px/MinusIcon20px';
import PlusIcon20px from '@/components/common/icons/20px/PlusIcon20px';

type QuantityBtnProps = {
  goodsPrice: number;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

const QuantityBtn = ({
  goodsPrice,
  totalPrice,
  setTotalPrice,
  quantity,
  setQuantity,
}: QuantityBtnProps) => {
  const handleIncrease = () => {
    setQuantity((prevQuantity) => (prevQuantity < 3 ? prevQuantity + 1 : 3));
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    setTotalPrice(goodsPrice * quantity);
  }, [goodsPrice, quantity, setTotalPrice]);

  return (
    <div>
      <div className='flex py-3 px-4 items-center justify-between'>
        <div className='flex items-center text-sm '>
          <p className=' w-[70px]'>수량</p>
          <div className='flex justify-center gap-3  bg-primary-300 rounded-lg py-2 px-4 w-[112px]'>
            <button onClick={handleDecrease}>
              <MinusIcon20px />
            </button>
            <p className='flex-grow text-center'>{quantity}</p>
            <button onClick={handleIncrease}>
              <PlusIcon20px />
            </button>
          </div>
        </div>
      </div>
      <div className='flex items-baseline gap-4 ml-auto justify-end mt-5'>
        <p className='text-sm'>총 상품금액</p>
        <p className='text-xl'>{totalPrice.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default QuantityBtn;
