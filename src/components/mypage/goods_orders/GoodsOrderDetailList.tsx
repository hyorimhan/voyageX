'use client';

import { getGoodsOrderDetail } from '@/services/goods';
import { GoodsOrdersType } from '@/types/goods';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type GoodsOrderDetailListProps = {
  order_id: string;
};

const GoodsOrderDetailList = ({ order_id }: GoodsOrderDetailListProps) => {
  const { data: goodsOrdersDetail } = useQuery<GoodsOrdersType>({
    queryKey: ['goodsOrdersDetail', order_id],
    queryFn: () => getGoodsOrderDetail(order_id),
  });

  console.log(goodsOrdersDetail);

  if (!goodsOrdersDetail) return <div>주문 내역이 없습니다.</div>;

  return (
    <>
      <div className='flex gap-8'>
        <div className='flex gap-2'>
          <p>주문일자</p>
          <p>2024. 07. 08</p>
        </div>
        <div className='flex gap-2'>
          <p>주문번호</p>
          <p>{order_id}</p>
        </div>
      </div>
      <div className='border-b-[1px] border-solid border-white mt-8'></div>
      <div className='flex flex-col gap-9'>
        <div className='border-[1px] border-white p-5 rounded-lg mt-8'>
          <div className='flex gap-[10px]'>
            <p className='text-xl'>주문상품 정보 </p>
            <p className='text-lg'>총 1개</p>
          </div>
          <div className='border-b-[1px] border-solid border-black-700 mt-3'></div>
          <div className='mt-4 flex'>
            <Image
              src='/images/goodsItem.svg'
              alt='goodsItem'
              height={50}
              width={104}
            />
            <div className='ml-[18px] flex justify-between w-full'>
              <div className='flex flex-col gap-2 justify-center'>
                <p>우주</p>
                <p>New Glenn Technical Tee</p>
              </div>
              <div className='flex flex-col w-[122px] justify-center gap-2 border-l-[1px] px-4'>
                <p>2,500,000원</p>
                <p className='text-sm'>수랑 1개</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col border-[1px] rounded-lg p-5'>
          <p className='h-9 border-b-[1px] border-black-700'>결제정보</p>
          <div className='h-[77px] flex flex-col gap-4 border-b-[1px] mt-4'>
            <div className='flex w-full justify-between text-sm'>
              <p>총 주분 금액</p>
              <p>60,200원</p>
            </div>
            <div className='flex w-full justify-between text-sm'>
              <p>총 배송비</p>
              <p>0원</p>
            </div>
          </div>
          <div className='flex justify-between mt-[17px]'>
            <p className='text-sm'>총 결제 금액</p>
            <p>60,200 원</p>
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='flex p-5 w-full flex-col border-[1px] rounded-md'>
            <p className='h-9 border-b-[1px] border-black-700  text-xl'>
              배송 정보
            </p>
            <div className='flex gap-4 mt-4'>
              <div className='flex flex-col gap-4'>
                <p>받는분</p>
                <p>휴대전화 번호</p>
                <p>배송지 정보</p>
              </div>
              <div className='flex flex-col gap-4'>
                <p>김철수</p>
                <p>010-123-1234</p>
                <p>도로명</p>
              </div>
            </div>
          </div>
          <div className='flex p-5 w-full flex-col border-[1px] rounded-md'>
            <p className='h-9 border-b-[1px] border-black-700 text-xl'>
              결제 수단
            </p>
            <div className='flex gap-4 mt-4'>
              <div className='flex flex-col gap-4'>
                <p>결제 방법</p>
                <p>분할 납부</p>
                <p>결제 일시</p>
                <p>주문 상태</p>
              </div>
              <div className='flex flex-col gap-4'>
                <p>카카오페이</p>
                <p>일시불</p>
                <p>2024.07.18 10:31 오전</p>
                <p>결제완료</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodsOrderDetailList;
