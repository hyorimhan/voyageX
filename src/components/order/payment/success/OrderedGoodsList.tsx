import { ItemToBuyType } from '@/types/goods';
import OrderedGoodsItem from './OrderedGoodsItem';
import OrderedGoodsItemMobile from './OrderedGoodsItemMobile';

interface OrderedGoodsInfoPropsType {
  goodsOrderInfo: ItemToBuyType[];
}

function OrderedGoodsList({ goodsOrderInfo }: OrderedGoodsInfoPropsType) {
  return (
    <div className='border-[1px] border-black-300 rounded-lg p-5 sm:mx-5'>
      <div className='text-xl border-b pb-3 border-black-700 mb-4 flex flex-row items-start font-medium'>
        <span className='text-xl'>주문상품 정보</span>
        <span className='mx-2 text-xl'>{' | '}</span>
        <span className='text-lg'>{` 총 ${
          goodsOrderInfo.length - 2 <= 0
            ? goodsOrderInfo.length
            : `2건 등 총 ${goodsOrderInfo.length}`
        }건`}</span>
      </div>
      <div className='sm:hidden'>
        {goodsOrderInfo.map((item, index) =>
          index < 2 ? (
            <OrderedGoodsItem key={item.goods.id} item={item} />
          ) : null,
        )}
      </div>
      <div className='md:hidden lg:hidden'>
        {goodsOrderInfo.map((item, index) =>
          index < 2 ? (
            <OrderedGoodsItemMobile key={item.goods.id} item={item} />
          ) : null,
        )}
      </div>
    </div>
  );
}

export default OrderedGoodsList;
