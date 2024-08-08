import { CartListType } from '@/types/mypageType';
import { Dispatch, SetStateAction } from 'react';
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
  return (
    <div className='flex flex-row justify-between items-center mb-4'>
      <div className='flex flex-row items-center gap-4'>
        <button
          onClick={handleSelectAllItems}
          className={`w-5 h-5 border-2 border-black-50 rounded ${
            selectItems.length === listLength
              ? listLength === 0
                ? 'bg-transparent'
                : 'bg-black-50'
              : 'bg-transparent'
          }`}
        ></button>
        <span className='text-base'>
          전체 ({selectItems ? selectItems.length : 0}/{listLength})
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
        className='bg-primary-400 text-xs rounded p-1 transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
      >
        선택 삭제
      </button>
    </div>
  );
}

export default CartItemSelector;
