'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import OrderItem from './OrderItem';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import OrderItemMobile from './OrderItemMobile';

interface ItemsInfoPropsType {
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

function OrderList({ setTotalPrice }: ItemsInfoPropsType) {
  const router = useRouter();
  const { goodsOrderInfo } = useGoodsOrderStore((state) => state);
  useEffect(() => {
    if (!goodsOrderInfo || !goodsOrderInfo.length) {
      toast.error('상품을 다시 선택해주세요');
      return router.back();
    }
    setTotalPrice(
      goodsOrderInfo.reduce((total, item) => {
        const price = item.goods.goods_price;
        const quantity = item.quantity;
        return total + price * quantity;
      }, 0),
    );
  });
  return (
    <div className='border-[1px] border-black-300 rounded-lg sm:p-4 md:pt-4 md:px-5 md:pb-5 lg:pt-4 lg:px-5 lg:pb-5 text-black-50'>
      <div className='pt-1 pb-3 md:mb-4 lg:mb-4 h-[50px] border-b border-black-700 font-medium flex flex-row items-start gap-2'>
        <span className='text-xl mb-2'>{`주문상품 정보`}</span>
        <span className='text-xl'>{' | '}</span>
        <span className='text-lg'>{`총 ${goodsOrderInfo?.reduce(
          (total, item) => (total = total + item.quantity),
          0,
        )}개`}</span>
      </div>
      <div className='sm:hidden'>
        {goodsOrderInfo?.map((item) => (
          <OrderItem key={item.goods.id} item={item} />
        ))}
      </div>
      <div className='md:hidden lg:hidden'>
        {goodsOrderInfo?.map((item) => (
          <OrderItemMobile key={item.goods.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default OrderList;
