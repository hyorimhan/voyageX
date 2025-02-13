'use client';

import Loading from '@/components/common/Loading';
import { getGoodsOrderDetail } from '@/services/goods';
import { GoodsOrdersType } from '@/types/goods';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import usePayResultStore from '@/zustand/store/usePayResultStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type GoodsOrderDetailListProps = {
  order_id: string;
};

const GoodsOrderDetailList = ({ order_id }: GoodsOrderDetailListProps) => {
  const router = useRouter();
  const { payResult } = usePayResultStore();
  const { goodsOrderInfo } = useGoodsOrderStore();
  const { expressAddress } = useExpressInfoStore();
  const {
    data: goodsOrdersDetail,
    error,
    isLoading,
  } = useQuery<GoodsOrdersType[]>({
    queryKey: ['goodsOrdersDetail', order_id],
    queryFn: () => getGoodsOrderDetail(order_id),
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading order details</div>;
  if (!goodsOrdersDetail || goodsOrdersDetail.length === 0)
    return <div>주문 내역이 없습니다.</div>;

  const totalOrderPrice = goodsOrdersDetail.reduce(
    (acc, item) => acc + item.total_price,
    0,
  );
  const totalExpressCost = goodsOrdersDetail.reduce(
    (acc, item) => acc + item.express_cost,
    0,
  );
  const totalQuantity = goodsOrdersDetail.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

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
      <div className='flex gap-8 sm:justify-between sm:gap-0'>
        <div className='flex gap-2 sm:text-sm'>
          <p>주문일자</p>
          <p>
            {formatOrderDate(
              goodsOrdersDetail[0].pay_at ?? payResult?.approvedAt,
            )}
          </p>
        </div>
        <div className='flex gap-2 sm:text-sm'>
          <p>주문번호</p>
          <p>{order_id ?? payResult?.orderId}</p>
        </div>
      </div>
      <div className='border-b-[1px] border-solid mt-8 sm:mt-6'></div>
      <div className='flex flex-col gap-9 sm:gap-6'>
        <div className='border-[1px] border-black-300 p-5 rounded-lg mt-8 sm:mt-6'>
          <div className='flex gap-[10px]'>
            <p className='text-xl'>주문상품 정보</p>
            <p className='self-center text-xl'>|</p>
            <p className='text-lg'>
              총{' '}
              {totalQuantity ??
                goodsOrderInfo?.reduce(
                  (total, item) => (total = total + item.quantity),
                  0,
                )}
              개
            </p>
          </div>
          <div className='border-b-[1px] border-solid border-black-700 mt-3'></div>
          {goodsOrdersDetail
            ? goodsOrdersDetail.map((item, index) => (
                <div key={index} className='mt-4 flex'>
                  <Image
                    src={item.goods.goods_img}
                    alt={item.goods.description}
                    height={104}
                    width={104}
                    className='object-cover cursor-pointer'
                    onClick={() => router.push(`/shop_detail/${item.goods_id}`)}
                  />
                  <div className='ml-[18px] flex justify-between w-full'>
                    <div
                      className='flex flex-col gap-2 justify-center sm:hidden cursor-pointer'
                      onClick={() =>
                        router.push(`/shop_detail/${item.goods_id}`)
                      }
                    >
                      <p>Voyage X</p>
                      <p className='text-lg'>{item.goods.goods_name}</p>
                      <div className='flex gap-2 items-center'>
                        <p>{item.goods.goods_price.toLocaleString()}원</p>
                        <p>|</p>
                        <p>수량 {item.quantity}개</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 justify-center md:hidden lg:hidden'>
                      <p className='text-sm'>Voyage X</p>
                      <p className='text-sm'>{item.goods.goods_name}</p>
                      <p className='text-xs text-black-200'>
                        수량 {item.quantity}개
                      </p>
                      <div className='items-center mt-5 font-semibold'>
                        <p>{item.goods.goods_price.toLocaleString()}원</p>
                      </div>
                    </div>
                    <div className='flex flex-col w-[122px] justify-center gap-2 border-l-[1px] px-4 sm:hidden'>
                      <p className='text-sm self-center'>{item.state}</p>
                    </div>
                  </div>
                </div>
              ))
            : goodsOrderInfo?.map((item, index) => (
                <div key={index} className='mt-4 flex'>
                  <Image
                    src={item.goods.goods_img}
                    alt={item.goods.description}
                    height={104}
                    width={104}
                    className='object-cover cursor-pointer'
                    onClick={() => router.push(`/shop_detail/${item.goods.id}`)}
                  />
                  <div className='ml-[18px] flex justify-between w-full'>
                    <div
                      className='flex flex-col gap-2 justify-center sm:hidden cursor-pointer'
                      onClick={() =>
                        router.push(`/shop_detail/${item.goods.id}`)
                      }
                    >
                      <p>Voyage X</p>
                      <p className='text-lg'>{item.goods.goods_name}</p>
                      <div className='flex gap-2 items-center'>
                        <p>{item.goods.goods_price.toLocaleString()}원</p>
                        <p>|</p>
                        <p>수량 {item.quantity}개</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 justify-center md:hidden lg:hidden'>
                      <p className='text-sm'>Voyage X</p>
                      <p className='text-sm'>{item.goods.goods_name}</p>
                      <p className='text-xs text-black-200'>
                        수량 {item.quantity}개
                      </p>
                      <div className='items-center mt-5 font-semibold'>
                        <p>{item.goods.goods_price.toLocaleString()}원</p>
                      </div>
                    </div>
                    <div className='flex flex-col w-[122px] justify-center gap-2 border-l-[1px] px-4 sm:hidden'>
                      <p className='text-sm self-center'>구매확정</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className='flex flex-col border-[1px] border-black-300 rounded-lg p-5'>
          <p className='h-9 border-b border-black-700'>결제정보</p>
          <div className='h-[77px] flex flex-col gap-4 border-b-[1px] mt-4'>
            <div className='flex w-full justify-between text-sm'>
              <p>총 주문 금액</p>
              <p>
                {totalOrderPrice.toLocaleString() ??
                  goodsOrderInfo?.reduce(
                    (total, item) =>
                      (total = total + item.quantity * item.goods.goods_price),
                    0,
                  )}
                원
              </p>
            </div>
            <div className='flex w-full justify-between text-sm'>
              <p>총 배송비</p>
              <p>{totalExpressCost.toLocaleString()}원</p>
            </div>
          </div>
          <div className='flex justify-between mt-[17px]'>
            <p className='text-sm'>총 결제 금액</p>
            <p>
              {(totalOrderPrice + totalExpressCost).toLocaleString() ??
                goodsOrderInfo?.reduce(
                  (total, item) =>
                    (total = total + item.quantity * item.goods.goods_price),
                  0,
                )}{' '}
              원
            </p>
          </div>
        </div>
        <div className='flex gap-8 flex-wrap mb-5 sm:gap-6'>
          <div className='flex p-5 flex-col border-[1px] border-black-300 rounded-md w-[489px] sm:w-full'>
            <p className='h-9 border-b-[1px] border-black-700 text-xl'>
              배송 정보
            </p>
            <div className='flex gap-4 mt-4 text-sm'>
              <div className='flex flex-col gap-4 w-[77px] sm:w-[95px]'>
                <p>받는분</p>
                <p>휴대전화 번호</p>
                <p className='sm:flex-grow flex sm:items-center'>배송지 정보</p>
              </div>
              <div className='flex flex-col gap-4 sm:flex-1'>
                <p>
                  {goodsOrdersDetail[0].recipient ?? expressAddress?.recipient}
                </p>
                <p>{goodsOrdersDetail[0].phone ?? expressAddress?.phone}</p>
                <div>
                  <p>
                    ({goodsOrdersDetail[0].postcode ?? expressAddress?.postcode}
                    )
                  </p>
                  <p>
                    도로명 :{' '}
                    {goodsOrdersDetail[0].address ?? expressAddress?.address}
                    {goodsOrdersDetail[0].detail_address ??
                      expressAddress?.detailAddress}
                  </p>
                  <p>
                    지번 :{' '}
                    {goodsOrdersDetail[0].old_address ??
                      expressAddress?.oldAddress}
                    {goodsOrdersDetail[0].detail_address ??
                      expressAddress?.detailAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex p-5 flex-col border-[1px] border-black-300 rounded-md flex-grow'>
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
                <p>{goodsOrdersDetail[0].pay_method ?? '카드'}</p>
                <p>
                  {goodsOrdersDetail
                    ? goodsOrdersDetail[0].installment
                      ? `${goodsOrdersDetail[0].installment}개월`
                      : '일시불'
                    : ''}
                </p>
                <p>
                  {formatDateTime(
                    goodsOrdersDetail[0].pay_at ?? payResult?.approvedAt,
                  )}
                </p>
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
