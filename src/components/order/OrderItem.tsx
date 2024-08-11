import { ItemToBuyType } from '@/types/goods';
import Image from 'next/image';

interface OrderItemPropsType {
  item: ItemToBuyType;
}

function OrderItem({ item }: OrderItemPropsType) {
  return (
    <div className='grid grid-cols-[minmax(0,1fr)_100px] mb-3'>
      <div className='flex items-center justify-start gap-4'>
        <div className='w-24 h-24'>
          <Image
            src={item.goods.goods_img}
            alt={item.goods.goods_name}
            width={104}
            height={104}
          />
        </div>
        <div className='flex flex-col text-white'>
          <p className='text-lg'>{item.goods.goods_name}</p>
          <div className='flex flex-row'>
            <span>{`${item.goods.goods_price.toLocaleString()}원`}</span>
            <span className='mx-2'>{' | '}</span>
            <span>{`수량 ${item.quantity}개`}</span>
          </div>
        </div>
      </div>
      <div className='border-l-[1px] border-black-300 flex justify-center items-center'>
        <p className='text-white'>구매확정</p>
      </div>
    </div>
  );
}

export default OrderItem;
