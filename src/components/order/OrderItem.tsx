import { ItemToBuyType } from '@/types/goods';
import Image from 'next/image';

interface OrderItemPropsType {
  item: ItemToBuyType;
}

function OrderItem({ item }: OrderItemPropsType) {
  return (
    <div className='grid grid-cols-[minmax(0,1fr)_100px] mb-3'>
      <div className='flex items-center justify-start gap-4'>
        <div className='w-20 h-24'>
          <Image
            src={item.goods.goods_img}
            alt={item.goods.goods_name}
            width={80}
            height={96}
          />
        </div>
        <p>{item.goods.goods_name}</p>
      </div>
      <div className='border-l-2 border-black-300 flex flex-col items-center justify-center'>
        <p>{`${item.goods.goods_price.toLocaleString()}원`}</p>
        <p>{`수량 ${item.quantity}개`}</p>
      </div>
    </div>
  );
}

export default OrderItem;
