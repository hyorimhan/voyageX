'use client';

import { useState } from 'react';
import MinusIcon20px from '@/components/common/icons/20px/MinusIcon20px';
import PlusIcon20px from '@/components/common/icons/20px/PlusIcon20px';
import useQuantityStore from '@/zustand/store/useQuantity';
import toast from 'react-hot-toast';

type QuantityBtnProps = {
  goodsPrice?: number;
  tourPrice?: number;
};

const QuantityBtn = ({ goodsPrice, tourPrice }: QuantityBtnProps) => {
  const setTotalPrice = useQuantityStore((state) => state.setTotalPrice);
  const setQuantities = useQuantityStore((state) => state.setQuantities);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (!tourPrice) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast.error('인당 1개씩 구매 가능합니다');
    }
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalPrice = goodsPrice! * quantity;

  if (!goodsPrice) {
    setTotalPrice(tourPrice!);
  } else {
    setTotalPrice(totalPrice);
  }

  setQuantities(quantity);

  return (
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
      <div className='flex items-baseline gap-4 ml-auto'>
        <p className='text-sm'>총 상품금액</p>
        <p className='text-xl'>
          {isNaN(totalPrice)
            ? tourPrice?.toLocaleString()
            : totalPrice.toLocaleString()}
          원
        </p>
      </div>
    </div>
  );
};

export default QuantityBtn;
