import { CartListType } from '@/types/mypageType';
import Image from 'next/image';

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

function CartItem({
  item,
  selectItems,
  handleSelectItem,
  handleAdjustItemQuantity,
}: CartItemPropsType) {
  return (
    <li className='border-2 border-black-50 p-4 rounded-lg grid grid-cols-[minmax(0,0.2fr)_minmax(0,0.5fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.5fr)]'>
      <button
        onClick={() => handleSelectItem(item)}
        className={`w-5 h-5 border-2 border-black-50 rounded self-center ${
          selectItems.includes(item) ? 'bg-black-50' : 'bg-transparent'
        }`}
      ></button>
      <div className='w-20 h-24 self-center'>
        <Image
          width={80}
          height={96}
          src={item.goods.goods_img}
          alt={item.goods.goods_name}
        />
      </div>
      <div className='self-center'>
        <span className='text-base'>{item.goods.goods_name}</span>
      </div>
      <div className='self-center flex flex-row gap-2 text-sm'>
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
          -
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
        >
          +
        </button>
      </div>
      <div className='self-center'>
        <span className='text-base'>
          {item.goods.goods_price.toLocaleString()}원
        </span>
      </div>
    </li>
  );
}

export default CartItem;
