import { ItemToBuyType } from '@/types/goods';
import Image from 'next/image';

interface OrderedGoodsItemPropsType {
  item: ItemToBuyType;
}

function OrderedGoodsItem({ item }: OrderedGoodsItemPropsType) {
  return (
    <div className='flex items-center my-4'>
      <div className='mr-[18px]'>
        <Image
          src={item.goods.goods_img}
          alt={item.goods.goods_name}
          width={104}
          height={104}
        />
      </div>
      <div className='w-[818px] mr-[18px] text-white'>
        <div className='text-lg mb-3'>{`${item.goods.goods_name}`}</div>
        <div className='flex flex-row items-start'>
          <span className='text-white text-base'>
            {item.goods.goods_price.toLocaleString()}원
          </span>
          <span className='mx-2'>{' | '}</span>
          <span className='text-white'>{`수량 ${item.quantity}개`}</span>
        </div>
      </div>
      <div className='flex flex-col border-l-[1px] border-black-300 h-[104px] px-4 py-[30px] w-[122px] items-center justify-center'>
        구매확정
      </div>
    </div>
  );
}

export default OrderedGoodsItem;
