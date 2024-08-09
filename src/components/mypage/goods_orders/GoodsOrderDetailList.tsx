'use client';

import { getGoodsOrderDetail } from '@/services/goods';
import { GoodsOrdersType } from '@/types/goods';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type GoodsOrderDetailListProps = {
  order_id: string;
};

const GoodsOrderDetailList = ({ order_id }: GoodsOrderDetailListProps) => {
  const {
    data: goodsOrdersDetail,
    error,
    isLoading,
  } = useQuery<GoodsOrdersType[]>({
    queryKey: ['goodsOrdersDetail', order_id],
    queryFn: () => getGoodsOrderDetail(order_id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading order details</div>;
  if (!goodsOrdersDetail || goodsOrdersDetail.length === 0)
    return <div>주문 내역이 없습니다.</div>;

  const totalOrderPrice = goodsOrdersDetail.reduce(
    (acc, item) => acc + item.order.total_price,
    0,
  );
  const totalExpressCost = goodsOrdersDetail.reduce(
    (acc, item) => acc + item.order.express_cost,
    0,
  );
  const totalQuantity = goodsOrdersDetail.reduce(
    (acc, item) => acc + item.order.quantity,
    0,
  );

  const paymentInfo = goodsOrdersDetail[0].order;
  const addressInfo = goodsOrdersDetail[0].address;

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
    <>
      <div className='flex gap-8'>
        <div className='flex gap-2'>
          <p>주문일자</p>
          <p>{formatOrderDate(paymentInfo.pay_at)}</p>
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
            <p className='text-xl'>주문상품 정보</p>
            <p className='text-lg'>총 {totalQuantity}개</p>
          </div>
          <div className='border-b-[1px] border-solid border-black-700 mt-3'></div>
          {goodsOrdersDetail.map((item, index) => (
            <div key={index} className='mt-4 flex'>
              <Image
                src={item.goods.goods_img}
                alt={item.goods.description}
                height={119}
                width={104}
              />
              <div className='ml-[18px] flex justify-between w-full'>
                <div className='flex flex-col gap-2 justify-center'>
                  <p>우주</p>
                  <p>{item.goods.goods_name}</p>
                </div>
                <div className='flex flex-col w-[122px] justify-center gap-2 border-l-[1px] px-4'>
                  <p>{item.goods.goods_price.toLocaleString()}원</p>
                  <p className='text-sm'>수량 {item.order.quantity}개</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col border-[1px] rounded-lg p-5'>
          <p className='h-9 border-b-[1px] border-black-700'>결제정보</p>
          <div className='h-[77px] flex flex-col gap-4 border-b-[1px] mt-4'>
            <div className='flex w-full justify-between text-sm'>
              <p>총 주문 금액</p>
              <p>{totalOrderPrice.toLocaleString()}원</p>
            </div>
            <div className='flex w-full justify-between text-sm'>
              <p>총 배송비</p>
              <p>{totalExpressCost.toLocaleString()}원</p>
            </div>
          </div>
          <div className='flex justify-between mt-[17px]'>
            <p className='text-sm'>총 결제 금액</p>
            <p>{(totalOrderPrice + totalExpressCost).toLocaleString()} 원</p>
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='flex p-5 w-full flex-col border-[1px] rounded-md'>
            <p className='h-9 border-b-[1px] border-black-700 text-xl'>
              배송 정보
            </p>
            <div className='flex gap-4 mt-4 text-sm'>
              <div className='flex flex-col gap-4 w-[77px]'>
                <p>받는분</p>
                <p>휴대전화 번호</p>
                <p>배송지 정보</p>
              </div>
              <div className='flex flex-col gap-4 w-[277px]'>
                <p>{paymentInfo.recipient}</p>
                <p>{paymentInfo.phone}</p>
                <div>
                  <p>({addressInfo.postcode})</p>
                  <p>
                    도로명 : {addressInfo.address} {addressInfo.detailAddress}
                  </p>
                  <p>
                    지번 : {addressInfo.oldAddress} {addressInfo.detailAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex p-5 w-full flex-col border-[1px] rounded-md'>
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
                <p>{paymentInfo.pay_method}</p>
                <p>
                  {paymentInfo.installment
                    ? `${paymentInfo.installment}개월`
                    : '일시불'}
                </p>
                <p>{formatDateTime(paymentInfo.pay_at)}</p>
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
