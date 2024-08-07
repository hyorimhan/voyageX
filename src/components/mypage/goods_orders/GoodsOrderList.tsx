'use client';

import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import ReviewFormModal from './ReviewFormModal';
import { useQuery } from '@tanstack/react-query';
import { getGoodsOrderList } from '@/services/goods';
import { GoodsOrdersType } from '@/types/goods';

const GoodsOrderList = () => {
  const [showReviewFormAddModal, setShowReviewFormAddModal] =
    useState<boolean>(false);
  const [selectedGoodsId, setSelectedGoodsId] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const user_id = user?.id;

  const { data: goodsOrders } = useQuery<GoodsOrdersType[]>({
    queryKey: ['goodsOrders', user_id],
    queryFn: () => getGoodsOrderList(user_id),
    enabled: !!user_id,
  });

  if (!goodsOrders || !Array.isArray(goodsOrders) || goodsOrders.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center gap-9 mt-16'>
        <Image
          src='/images/arcticons_spacenow.svg'
          alt='spacenow'
          width={80}
          height={80}
        />
        <div>
          <p className='text-xl'>주문한 상품이 없습니다.</p>
          <p className='text-sm mt-[7px]'>
            새로운 우주 관련 상품으로 채워보세요.
          </p>
        </div>
        <Link
          href={'/shop'}
          className='h-[43px] w-[230px] bg-primary-600 rounded-md text-black-50 justify-center items-center flex hover:bg-primary-400 active:bg-primary-500'
        >
          GOODS SHOP 바로가기
        </Link>
      </div>
    );
  }

  // 주문일자를 변환하는 함수
  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} .${month} .${day}`;
  };

  // 주문을 날짜별로 그룹화
  const sortedGoodsOrders = goodsOrders.sort(
    (a, b) => new Date(b.pay_at).getTime() - new Date(a.pay_at).getTime(),
  );

  const ordersById = sortedGoodsOrders.reduce((acc, order) => {
    const id = order.id;
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(order);
    return acc;
  }, {} as Record<string, GoodsOrdersType[]>);

  return (
    <>
      {Object.entries(ordersById).map(([id, orders]) => (
        <div key={id}>
          <div className='flex justify-between h-[53px] items-center'>
            <p className='text-lg'>
              주문일자 {formatOrderDate(orders[0].pay_at)}
            </p>
            <button className='flex items-center text-sm'>
              <Link href={`/mypage/goods_orders/${id}`}>상세정보</Link>
              <MdOutlineKeyboardArrowRight className='text-xl' />
            </button>
          </div>
          <div className='border-b-[1px] border-solid border-black-700'></div>
          {orders.map((order, index) => (
            <div key={order.id}>
              <div className='flex justify-between h-[120px]'>
                <div className='flex gap-5 items-center'>
                  <div className='bg-white flex h-[88px]'>
                    <Image
                      src={order.goods.goods_img}
                      alt={order.goods.description}
                      width={80}
                      height={90}
                    />
                  </div>
                  <div className='gap-2 flex flex-col'>
                    <p>{order.goods.goods_name}</p>
                    <p className='font-semibold text-xl'>
                      {order.goods.goods_price.toLocaleString()}원
                    </p>
                    <p className='text-sm'>수량 {order.quantity}개</p>
                  </div>
                </div>
                <div className='flex items-center justify-end'>
                  <div className='flex flex-row gap-4 text-center text-sm'>
                    <p className='w-[79px]'>무료배송</p>
                    <p className='w-[78px]'>{order.state}</p>
                  </div>
                  <div className='w-[79px] flex justify-center ml-4'>
                    <button
                      className='bg-primary-400 p-2 rounded-md w-[58px] text-xs'
                      onClick={() => {
                        setSelectedGoodsId(order.goods_id);
                        setShowReviewFormAddModal(true);
                      }}
                    >
                      리뷰작성
                    </button>
                  </div>
                </div>
              </div>
              {index === orders.length - 1 && (
                <div className='border-b-[1px] border-solid border-black-300 mt-4'></div>
              )}
            </div>
          ))}
        </div>
      ))}
      {showReviewFormAddModal && user && selectedGoodsId && (
        <ReviewFormModal
          goodsId={selectedGoodsId}
          userId={user.id}
          onClose={() => setShowReviewFormAddModal(false)}
        />
      )}
    </>
  );
};

export default GoodsOrderList;
