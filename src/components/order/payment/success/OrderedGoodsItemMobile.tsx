import { ItemToBuyType } from '@/types/goods';
import Image from 'next/image';

interface OrderedGoodsItemPropsType {
  item: ItemToBuyType;
}

function OrderedGoodsItemMobile({ item }: OrderedGoodsItemPropsType) {
  return (
    <div className='mt-2 py-4 border-b-[1px] border-black-300 last:border-none'>
      <div className='flex items-start justify-start gap-4'>
        <div className='w-[104px] h-[104px]'>
          <Image
            src={item.goods.goods_img}
            alt={item.goods.goods_name}
            width={104}
            height={104}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1 text-white'>
            <span className='text-sm text-white'>Voyage X</span>
            <span className='text-sm font-semibold text-white'>
              {item.goods.goods_name}
            </span>
            <span className='text-xs text-black-200'>{`수량 ${item.quantity}개`}</span>
          </div>
          <div>
            <span className='text-base text-white font-semibold'>{`${item.goods.goods_price.toLocaleString()}원`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderedGoodsItemMobile;
