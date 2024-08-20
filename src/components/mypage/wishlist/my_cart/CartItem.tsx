'use client';

import MinusIcon20px from '@/components/common/icons/20px/MinusIcon20px';
import PlusIcon20px from '@/components/common/icons/20px/PlusIcon20px';
import { CartListType } from '@/types/mypageType';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CheckBoxPressedIcon24px from '@/components/common/icons/24px/CheckBoxPressedIcon24px';
import CheckBoxHoveredIcon24px from '@/components/common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxDefaultIcon24px from '@/components/common/icons/24px/CheckBoxDefaultIcon24px';

interface CartItemPropsType {
  item: CartListType;
  selectItemIds: string[];
  handleSelectItem: (itemId: string) => void;
  handleAdjustItemQuantity: ({
    id,
    operator,
  }: {
    id: string;
    operator: string;
  }) => void;
}

function CartItem({
  item,
  selectItemIds,
  handleSelectItem,
  handleAdjustItemQuantity,
}: CartItemPropsType) {
  const [isHovered, setIsHovered] = useState(false);
  const [resPrice, setResPrice] = useState(0);

  useEffect(() => {
    setResPrice(item.quantity * item.goods.goods_price);
  }, [item.quantity, item.goods]);
  return (
    <li className='border-t-[1px] border-black-700 px-2 h-[136px] flex justify-between'>
      <div className='flex justify-center'>
        <button
          onClick={() => handleSelectItem(item.id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {selectItemIds.includes(item.id) ? (
            <CheckBoxPressedIcon24px />
          ) : isHovered ? (
            <CheckBoxHoveredIcon24px />
          ) : (
            <CheckBoxDefaultIcon24px />
          )}
        </button>
        <div className='flex justify-center self-center ml-2'>
          <Image
            width={104}
            height={119}
            src={item.goods.goods_img}
            alt={item.goods.goods_name}
          />
        </div>
        <div className='self-center ml-4'>
          <span>{item.goods.goods_name}</span>
        </div>
      </div>
      <div className='flex'>
        <div className='flex flex-row border-[1px] border-primary-300 rounded-lg justify-center gap-3 h-[33px] w-[96px] items-center self-center'>
          <button
            onClick={() => {
              handleAdjustItemQuantity({
                id: item.id,
                operator: '-',
              });
            }}
          >
            <MinusIcon20px />
          </button>
          <span className='font-medium'>{item.quantity}</span>
          <button
            onClick={() => {
              handleAdjustItemQuantity({
                id: item.id,
                operator: '+',
              });
            }}
          >
            <PlusIcon20px />
          </button>
        </div>
        <div className='self-center w-[152px] text-center ml-[136px] font-medium'>
          <span>{resPrice.toLocaleString()}원</span>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
