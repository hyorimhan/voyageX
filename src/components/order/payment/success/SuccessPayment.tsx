'use client';

import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/zustand/store/useAuth';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfo';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { createReceipt } from '@/services/pay';

function SuccessPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>();

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  const { user } = useAuthStore((state) => state);
  const { expressAddress } = useExpressInfoStore((state) => state);
  const { customerInfo } = useCustomerInfoStore((state) => state);
  const { goodsOrderInfo } = useGoodsOrderStore((state) => state);

  useEffect(() => {
    if (!orderId || !paymentKey || !amount || !authKey) {
      toast.error('다시 시도해주세요!');
      return router.replace('/shop/order');
    }
    const getOrderConfirm = async () => {
      try {
        const confirm = await axios.post(
          'https://api.tosspayments.com/v1/payments/confirm',
          {
            paymentKey,
            amount,
            orderId,
          },
          {
            headers: {
              'Authorization': `Basic ${authKey}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setResult(confirm.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderConfirm();
  });

  useEffect(() => {
    if (!result) return;
    const postReceipt = async () => {
      let pay_method: string = '';
      let installment: number = 0;
      if (result.card) {
        pay_method = result.method;
        installment = result.card.installmentPlanMonths;
      } else if (result.easyPay) {
        pay_method = `${result.easyPay.provider} ${result.method}`;
      }

      const response = await createReceipt({
        user_id: user!.id,
        order_id: orderId,
        goodsList: goodsOrderInfo!,
        customer: customerInfo!,
        address_id: expressAddress!.id,
        pay_method,
        installment,
      });
      console.log('response => ', response);
    };
    postReceipt();
  }, [result]);

  if (!result || !goodsOrderInfo)
    return (
      <div className='w-full'>
        <div className='w-1/2 h-[700px] my-auto mx-auto flex flex-col items-center justify-center'>
          <p>화면이 지속된다면</p>
          <p>홈 화면으로 돌아가주세요.</p>
          <button
            className='border-2 rounded-lg p-2 hover:brightness-150 cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black-1000 hover:font-extrabold'
            onClick={() => router.replace('/')}
          >
            돌아가기
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div className='flex mt-[137px] mb-11 items-center justify-between'>
        <div className=' border-white text-4xl font-bold text-white w-[330px]'>
          주문이 완료되었습니다
        </div>
        <div className='flex gap-4 w-[571px] '>
          <div>
            <Link href={`/mypage/goods_orders`}>
              <button className='border-[1.5px] border-primary-400 h-[53px] w-[277.5px] rounded-lg bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300'>
                주문상세 보기
              </button>
            </Link>
          </div>
          <div>
            <Link href={'/shop'}>
              <button className=' bg-primary-600 h-[53px] w-[277.5px] rounded-lg duration-200 hover:bg-primary-400 active:bg-primary-500'>
                쇼핑 계속하기
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='mb-8'>주문상품 번호 {result.orderId}</div>

      <div className='border-[1px] border-black-300 rounded-lg p-5'>
        <div className='text-xl border-b pb-3 border-black-700 mb-4'>
          주문상품 정보
        </div>
        <div className='flex items-center'>
          <div className='mr-[18px]'>
            <Image
              src={goodsOrderInfo[0]?.goods.goods_img}
              alt={goodsOrderInfo[0]?.goods.goods_name}
              width={104}
              height={104}
            />
          </div>
          <div className='w-[818px] mr-[18px]'>
            <div>{`${goodsOrderInfo[0]?.goods.goods_name}`}</div>
          </div>
          <div className='flex flex-col border-l border-black-300 h-[104px] px-4 py-[30px] w-[122px]'>
            <p className='text-white text-base'>
              {goodsOrderInfo[0]?.goods.goods_price.toLocaleString()}원
            </p>
            <span className='text-white text-sm'>
              {`수량 ${goodsOrderInfo[0]?.quantity}개`}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-8 mx-auto max-w-[1120px] flex flex-wrap gap-8'>
        {/* 배송 정보 */}
        <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            배송 정보
          </div>
          <div className='pt-4 flex'>
            <div className='w-[104px] text-black-200'>받는 분 </div>
            {expressAddress?.recipient}
          </div>
          <div className='flex py-5'>
            <div className='w-[104px] text-black-200'>휴대전화 번호</div>
            {expressAddress?.phone}
          </div>
          <div className='flex gap-10'>
            <div className='w-[104px] text-black-200'>배송지 정보</div>
            <div>
              <div>
                도로명: {expressAddress?.address}{' '}
                {expressAddress?.detailAddress}
              </div>
              <div>
                지번: {expressAddress?.oldAddress}{' '}
                {expressAddress?.detailAddress}
              </div>
              <div>{`(${expressAddress?.postcode})`}</div>
            </div>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            결제 정보
          </div>
          <div className='pt-4 flex'>
            <div className='w-[104px]'>총 주문 금액 </div>
            {(+amount).toLocaleString()}원
          </div>
          <div className='flex py-5 w-full border-b-black-700 border-b-[1px]'>
            <div className='w-[104px]'>총 배송비</div>
            무료
          </div>
          <div className='flex pt-5'>
            <div className='w-[104px]'>총 결제 금액 </div>
            {(+amount).toLocaleString()}원
          </div>
        </div>

        {/* 결제 수단 */}
        <div className='border-black-300 border-[1px] rounded-lg p-5 flex-1 min-w-[300px]'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            결제 수단
          </div>
          <div className='text-sm'>
            <div className='pt-4 flex'>
              <div className='w-[104px]'>결제 방법</div>
              {result.easyPay
                ? `${result.easyPay.provider} ${result.method}`
                : result.method}
            </div>
            <div className='py-5 flex'>
              <div className='w-[104px]'>분할 납부</div>
              {result.card &&
                `${
                  result.card.installmentPlanMonths
                    ? `${result.card.installmentPlanMonths}개월 할부`
                    : '일시불'
                }`}
            </div>
            <div className='flex'>
              <div className='w-[104px]'> 결제 일시 </div>
              {result.approvedAt.slice(0, 10)}
            </div>
            <div className='pt-5 flex'>
              <div className='w-[104px]'>주문 상태</div> 결제완료
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPayment;
