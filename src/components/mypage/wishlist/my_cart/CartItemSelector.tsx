'use client';

import CheckBoxDefaultIcon24px from '@/components/common/icons/24px/CheckBoxDefaultIcon24px';
import CheckBoxHoveredIcon24px from '@/components/common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxPressedIcon24px from '@/components/common/icons/24px/CheckBoxPressedIcon24px';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

interface CartItemSelectorPropsType {
  selectItemIds: string[];
  listLength: number;
  handleSelectAllItems: () => void;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

function CartItemSelector({
  selectItemIds,
  listLength,
  handleSelectAllItems,
  setIsDeleteOpen,
}: CartItemSelectorPropsType) {
  const [isHovered, setIsHovered] = useState(false);
  const isChecked = selectItemIds.length === listLength && listLength > 0;

  const handleClick = () => {
    handleSelectAllItems();
  };
  return (
    <div className='flex flex-row justify-between items-center h-[62px]'>
      <div className='flex flex-row items-center gap-4 md:gap-1 lg:gap-1'>
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
        <span className='flex gap-1 font-medium'>
          <p>전체</p>
          {selectItemIds.length === listLength
            ? !listLength
              ? '선택 '
              : '해제 '
            : '선택 '}
          ({selectItemIds ? selectItemIds.length : 0}/{listLength})
        </span>
      </div>
      <button
        onClick={() => {
          if (!selectItemIds.length) {
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
