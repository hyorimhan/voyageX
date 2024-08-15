'use client';

import MinusIcon20px from '@/components/common/icons/20px/MinusIcon20px';
import PlusIcon20px from '@/components/common/icons/20px/PlusIcon20px';
import { CartListType } from '@/types/mypageType';
import Image from 'next/image';
import { useState } from 'react';
import CheckBoxPressedIcon24px from '@/components/common/icons/24px/CheckBoxPressedIcon24px';
import CheckBoxHoveredIcon24px from '@/components/common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxDefaultIcon24px from '@/components/common/icons/24px/CheckBoxDefaultIcon24px';

interface CartItemPropsType {
  item: CartListType;
  selectItems: CartListType[];
  handleSelectItem: (goods: CartListType) => void;
  handleAdjustItemQuantity: ({
    id,
    operator,
    prev,
  }: {
    id: string;
    operator: string;
    prev: number;
  }) => void;
}

function CartItemMobile({
  item,
  selectItems,
  handleSelectItem,
  handleAdjustItemQuantity,
}: CartItemPropsType) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li className='border-t-[1px] border-black-700 px-2 flex flex-row items-start'>
      <div className='w-[24px] h-[24px] mt-[28px]'>
        <button
          onClick={() => handleSelectItem(item)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {selectItems.includes(item) ? (
            <CheckBoxPressedIcon24px />
          ) : isHovered ? (
            <CheckBoxHoveredIcon24px />
          ) : (
            <CheckBoxDefaultIcon24px />
          )}
        </button>
      </div>
      <div className='flex flex-col items-start gap-2'>
        <div className='flex flex-row items-center gap-4 mt-5 ml-3 w-full'>
          <div>
            <Image
              width={104}
              height={119}
              src={item.goods.goods_img}
              alt={item.goods.goods_name}
            />
          </div>
          <div className='w-[152px]'>
            <span className='font-medium'>{item.goods.goods_name}</span>
          </div>
        </div>
        <div className='w-full flex flex-row ml-3 gap-[19px]'>
          <div className='flex flex-row border-[1px] border-primary-300 rounded-lg justify-center gap-3 h-8 w-[104px] items-center self-center'>
            <button
              onClick={() =>
                handleAdjustItemQuantity({
                  id: item.id,
                  operator: '-',
                  prev: item.quantity,
                })
              }
              disabled={item.quantity === 1}
            >
              <MinusIcon20px />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                handleAdjustItemQuantity({
                  id: item.id,
                  operator: '+',
                  prev: item.quantity,
                })
              }
              disabled={item.quantity === 3}
            >
              <PlusIcon20px />
            </button>
          </div>
          <div className='self-center w-[152px] h-8 text-right font-medium'>
            <span>{item.goods.goods_price.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItemMobile;
