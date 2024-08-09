'use client';

import CheckBoxDefaultIcon24px from '@/components/common/icons/24px/CheckBoxDefaultIcon24px';
import CheckBoxHoveredIcon24px from '@/components/common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxPressedIcon24px from '@/components/common/icons/24px/CheckBoxPressedIcon24px';
import { CartListType } from '@/types/mypageType';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

interface CartItemSelectorPropsType {
  selectItems: CartListType[];
  listLength: number;
  handleSelectAllItems: () => void;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

function CartItemSelector({
  selectItems,
  listLength,
  handleSelectAllItems,
  setIsDeleteOpen,
}: CartItemSelectorPropsType) {
  const [isHovered, setIsHovered] = useState(false);
  const isChecked = selectItems.length === listLength && listLength > 0;

  const handleClick = () => {
    handleSelectAllItems();
  };
  return (
    <div className='flex flex-row justify-between items-center h-[62px]'>
      <div className='flex flex-row items-center gap-1'>
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isChecked ? (
            <CheckBoxPressedIcon24px />
          ) : isHovered ? (
            <CheckBoxHoveredIcon24px />
          ) : (
            <CheckBoxDefaultIcon24px />
          )}
        </button>
        <span className='flex gap-1'>
          <p>전체</p> ({selectItems ? selectItems.length : 0}/{listLength})
          {selectItems.length === listLength
            ? !listLength
              ? '선택'
              : '해제'
            : '선택'}
        </span>
      </div>
      <button
        onClick={() => {
          if (!selectItems.length) {
            return toast.error('상품을 선택해주세요');
          }
          setIsDeleteOpen(true);
        }}
        className='bg-primary-400 text-xs rounded p-2 transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
      >
        선택삭제
      </button>
    </div>
  );
}

export default CartItemSelector;
