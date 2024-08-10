'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getTourOrderDetail } from '@/services/tour';
import { TourOrderType } from '@/types/tour';
import Loading from '@/components/common/Loading';

type TourOrderDetailListProps = {
  order_id: string;
};

const TourOrderDetailList = ({ order_id }: TourOrderDetailListProps) => {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<TourOrderType>({
    queryKey: ['tourOrderDetail', order_id],
    queryFn: () => getTourOrderDetail(order_id),
  });

  if (isLoading) return <Loading />;

  if (isError || !order) {
    return <div>주문 내역이 없습니다.</div>;
  }

  const formatDateTime = (dateString: string) => {
    const optionsDate: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString('ko-KR', optionsDate)
      .replace(/\./g, '')
      .trim()
      .split(' ')
      .join('.');

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes} ${period}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} .${month} .${day}`;
  };

  return (
    <div className='flex flex-col'>
      <div className='flex gap-2'>
        <p>주문일자</p>
        <p>{formatOrderDate(order.pay_at)}</p>
        <p className='ml-8'>주문번호</p>
        <p>{order.id}</p>
      </div>
      <div className='border-b-[1px] border-solid border-white mt-8'></div>
      <div className='flex flex-col gap-9'>
        <div className='border-[1px] border-black-300 p-5 rounded-lg mt-8'>
          <div className='flex gap-[10px]'>
            <p className='text-xl'>주문상품 정보</p>
            <p className='text-lg'>총 1개</p>
          </div>
          <div className='border-b-[1px] border-solid border-black-700 mt-3'></div>
          <div className='mt-4 flex'>
            <Image
              src={order.planet.planet_img}
              alt={order.planet.description}
              height={119}
              width={104}
            />
            <div className='ml-[18px] flex justify-between w-full'>
              <div className='flex flex-col justify-center'>
                <p className='text-sm'>6박 7일 패키지</p>
                <div className='text-lg font-semibold flex gap-2 mt-1'>
                  <p className='text-lg font-semibold'>{order.planet.name}</p>
                  <p>{order.planet.english_name}</p>
                </div>
                <div className='flex gap-2'>
                  <p>{order.tour.price.toLocaleString()}원</p>
                  <p>|</p>
                  <p>수량 1개</p>
                </div>
              </div>
              <div className='flex w-[126px] justify-center items-center gap-2 border-l-[1px] border-black-300'>
                <p>구매확정</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col border-[1px] rounded-lg p-5 border-black-300'>
          <p className='h-9 border-b-[1px] border-black-700'>결제정보</p>
          <div className='h-[77px] flex flex-col gap-4 border-b-[1px] mt-4 border-black-50'>
            <div className='flex w-full justify-between text-sm'>
              <p>총 주문 금액</p>
              <p>{order.tour.price.toLocaleString()}원</p>
            </div>
            <div className='flex w-full justify-between text-sm'>
              <p>총 배송비</p>
              <p>0원</p>
            </div>
          </div>
          <div className='flex justify-between mt-[17px]'>
            <p className='text-sm'>총 결제 금액</p>
            <p>{order.tour.price.toLocaleString()} 원</p>
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='flex p-5 w-full flex-col border-[1px] rounded-lg border-black-300'>
            <p className='h-9 border-b-[1px] border-black-700 text-xl'>
              결제 수단
            </p>
            <div className='flex gap-4 mt-4 text-sm'>
              <div className='flex flex-col gap-5'>
                <p>결제 방법</p>
                <p>분할 납부</p>
                <p>결제 일시</p>
                <p>주문 상태</p>
              </div>
              <div className='flex flex-col gap-5'>
                <p>{order.pay_method}</p>
                <p>
                  {order.installment ? `${order.installment}개월` : '일시불'}
                </p>
                <p>{formatDateTime(order.pay_at)}</p>
                <p>결제완료</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOrderDetailList;
