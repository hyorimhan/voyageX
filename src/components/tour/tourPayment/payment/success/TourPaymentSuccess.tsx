'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import { createTourReceipt } from '@/services/pay';
import usePayResultStore from '@/zustand/store/usePayResultStore';
import Loading from '@/components/common/Loading';

function TourPaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  const { user } = useAuthStore((state) => state);
  const { customerInfo } = useCustomerInfoStore((state) => state);
  const { tourOrder, setTourOrder } = useTourOrderInfoStore((state) => state);
  const { payResult, setPayResult } = usePayResultStore((state) => state);

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
        setPayResult(confirm.data);
      } catch (error) {
        // console.error(error);
      }
    };
    if (!payResult) {
      getOrderConfirm();
    }
  });

  useEffect(() => {
    if (!payResult || !user) return;
    const postReceipt = async () => {
      let pay_method: string = '';
      let installment: number = 0;
      if (payResult.card) {
        pay_method = payResult.method;
        installment = payResult.card.installmentPlanMonths;
      } else if (payResult.easyPay) {
        pay_method = `${payResult.easyPay.provider} ${payResult.method}`;
      }

      await createTourReceipt({
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
    };
    postReceipt();
    router.push(`/tour/payment/success/result`);
  }, [
    payResult,
    customerInfo,
    orderId,
    setTourOrder,
    tourOrder?.arrive_date,
    tourOrder?.depart_date,
    tourOrder?.gate,
    tourOrder?.qr_code,
    tourOrder?.tour_id,
    user,
    router,
  ]);

  return (
    <div className='w-full'>
      <div className='w-1/2 h-[700px] my-auto mx-auto flex flex-col items-center justify-center'>
        <Loading />
        <p>결제가 진행중입니다.</p>
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
}

export default TourPaymentSuccess;
