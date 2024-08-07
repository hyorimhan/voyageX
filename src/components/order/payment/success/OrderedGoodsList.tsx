import { ItemToBuyType } from '@/types/goods';
import OrderedGoodsItem from './OrderedGoodsItem';

interface OrderedGoodsInfoPropsType {
  goodsOrderInfo: ItemToBuyType[];
}

function OrderedGoodsList({ goodsOrderInfo }: OrderedGoodsInfoPropsType) {
  return (
    <div className='border-[1px] border-black-300 rounded-lg p-5'>
      <div className='text-xl border-b pb-3 border-black-700 mb-4'>
        {`주문상품 정보 ${
          goodsOrderInfo.length - 2 <= 0
            ? goodsOrderInfo.length
            : `2건 외 ${goodsOrderInfo.length - 2}`
        }건`}
      </div>
      {goodsOrderInfo.map((item, index) =>
        index < 2 ? <OrderedGoodsItem key={item.goods.id} item={item} /> : null,
      )}
    </div>
  );
}

export default OrderedGoodsList;
