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
    quantity,
  }: {
    id: string;
    operator: string;
    quantity: number;
  }) => void;
}

function CartItemMobile({
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
    <li className='border-t-[1px] border-black-700 px-2 flex flex-row items-start'>
      <div className='w-[24px] h-[24px] mt-[28px]'>
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
                  quantity: item.quantity,
                })
              }
            >
              <MinusIcon20px />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                handleAdjustItemQuantity({
                  id: item.id,
                  operator: '+',
                  quantity: item.quantity,
                })
              }
            >
              <PlusIcon20px />
            </button>
          </div>
          <div className='self-center w-[152px] h-8 text-right font-medium'>
            <span>{resPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItemMobile;
