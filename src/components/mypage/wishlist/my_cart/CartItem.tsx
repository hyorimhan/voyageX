import MinusIcon20px from '@/components/common/icons/20px/MinusIcon20px';
import PlusIcon20px from '@/components/common/icons/20px/PlusIcon20px';
import { CartListType } from '@/types/mypageType';
import Image from 'next/image';
import CheckBox from '../../delete_account/CheckBox';

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
    <li className='border-t-[1px] border-black-700 px-2 h-[136px] flex justify-between'>
      <div className='flex justify-center'>
        <div className='p-2 flex'>
          <CheckBox onChange={() => handleSelectItem(item)} />
        </div>
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
          >
            <PlusIcon20px />
          </button>
        </div>
        <div className='self-center w-[152px] text-center ml-[136px]'>
          <span>{item.goods.goods_price.toLocaleString()}</span>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
