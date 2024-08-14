import { ItemToBuyType } from '@/types/goods';
import Image from 'next/image';

interface OrderItemPropsType {
  item: ItemToBuyType;
}

function OrderItemMobile({ item }: OrderItemPropsType) {
  return (
    <div className='border-b-[1px] border-black-300 last:border-none py-4'>
      <div className='flex items-center justify-start gap-4'>
        <div className='w-[104px] h-[104px]'>
          <Image
            src={item.goods.goods_img}
            alt={item.goods.goods_name}
            width={104}
            height={104}
          />
        </div>
        <div className='flex flex-col gap-5 text-white'>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-white'>Voyage X</span>
            <p className='text-sm'>{item.goods.goods_name}</p>
            <span className='text-black-200 text-xs'>{`수량 ${item.quantity}개`}</span>
          </div>
          <div className='flex flex-row'>
            <span>{`${item.goods.goods_price.toLocaleString()}원`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItemMobile;
