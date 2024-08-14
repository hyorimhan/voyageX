import { ItemToBuyType } from '@/types/goods';
import Image from 'next/image';

interface OrderItemPropsType {
  item: ItemToBuyType;
}

function OrderItem({ item }: OrderItemPropsType) {
  return (
    <div className='mb-3'>
      <div className='flex items-center justify-start gap-4'>
        <div className='w-[104px] h-[104px]'>
          <Image
            src={item.goods.goods_img}
            alt={item.goods.goods_name}
            width={104}
            height={104}
          />
        </div>
        <div className='flex flex-col gap-3 text-white'>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-white'>Voyage X</span>
            <p className='text-lg font-semibold'>{item.goods.goods_name}</p>
          </div>
          <div className='flex flex-row text-base'>
            <span>{`${item.goods.goods_price.toLocaleString()}원`}</span>
            <span className='mx-2'>{' | '}</span>
            <span>{`수량 ${item.quantity}개`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
