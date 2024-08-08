'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import OrderedTourInfo from './OrderedTourInfo';
import PriceInfo from '@/components/order/payment/success/PriceInfo';
import AfterPayButtons from './AfterPayButtons';
import PayMethodInfo from '@/components/order/payment/success/PayMethodInfo';
import { createTourReceipt } from '@/services/pay';

function TourPaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>();

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  const { user } = useAuthStore((state) => state);
  const { customerInfo } = useCustomerInfoStore((state) => state);
  const { tourOrder, setTourOrder } = useTourOrderInfoStore((state) => state);

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
    if (!result || !user) return;
    const postReceipt = async () => {
      let pay_method: string = '';
      let installment: number = 0;
      if (result.card) {
        pay_method = result.method;
        installment = result.card.installmentPlanMonths;
      } else if (result.easyPay) {
        pay_method = `${result.easyPay.provider} ${result.method}`;
      }

      const response = await createTourReceipt({
        user_id: user.id,
        order_id: orderId,
        tour_id: tourOrder?.tour_id!,
        customer: customerInfo!,
        depart_date: tourOrder?.depart_date!,
        arrive_date: tourOrder?.arrive_date!,
        gate: tourOrder?.gate!,
        qr_code: tourOrder?.qr_code!,
        pay_method,
        installment,
      });
      console.log('response => ', response);
    };
    postReceipt();
    return () => {
      setTourOrder(null);
    };
  }, [result]);

  if (!result || !tourOrder)
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
    <div className='md:mx-5 sm:mx-5'>
      <div className='flex md:grid sm:grid md:grid-cols-1 sm:grid-cols-1 mt-[137px] mb-11 items-center justify-between'>
        <div className=' max-full'>
          <div className='text-4xl font-bold sm:text-xl border-white  text-white  '>
            주문이 완료되었습니다
          </div>
        </div>
        <div>
          <div className='mb-8 lg:hidden sm:mt-4 md:mt-4'>
            주문상품 번호 {result.orderId}
          </div>
          <AfterPayButtons />
        </div>
      </div>
      <div className='mb-8 sm:hidden md:hidden'>
        주문상품 번호 {result.orderId}
      </div>
      <OrderedTourInfo tourOrder={tourOrder} />
      <div className='mt-8 mx-auto max-w-[1120px] flex flex-wrap gap-8 mb-10'>
        <PriceInfo amount={+amount} />
        <PayMethodInfo result={result} />
      </div>
    </div>
  );
}

export default TourPaymentSuccess;
