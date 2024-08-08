'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import OrderItem from './OrderItem';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';

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
    <div className='border-2 border-black-300 p-4 rounded-lg mb-4 text-black-50'>
      <div className='py-4 mb-4 border-b-2 border-black-700'>
        <span className='text-xl'>{`상품정보 총 ${goodsOrderInfo?.length}개`}</span>
      </div>
      {goodsOrderInfo?.map((item) => (
        <OrderItem key={item.goods.id} item={item} />
      ))}
    </div>
  );
}

export default OrderList;
