'use client';

import { userLoginInfo } from '@/services/auth';
import { tourPayment } from '@/services/tour';
import useAuthStore from '@/zustand/store/useAuth';
import useTourIdStore from '@/zustand/store/useTourId';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function SuccessPayment({ tourUrl }: { tourUrl: string }) {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const setTourId = useTourIdStore((state) => state.setTourId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>();

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const itemInfo = searchParams.get('itemInfo');
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  useEffect(() => {
    setTourId(tourUrl);
  }, []);

  const tourId = tourUrl;

  useEffect(() => {
    if (!orderId || !paymentKey || !amount || !authKey) {
      toast('오류가 발생했습니다');
      router.replace('/tour');
      return;
    }

    const getOrderConfirmData = async () => {
      try {
        console.log('Confirming payment...');
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

        const res = await userLoginInfo();
        saveUser(res.user);
        const userId = res.user?.id;

        if (!orderId || !paymentKey || !amount || !authKey) {
          toast('오류가 발생했습니다');
          router.replace('/tour');
          return;
        }

        if (!userId) {
          toast.error('사용자 정보가 없습니다.');
        }
        if (!tourId) {
          toast.error('투어 정보가 없습니다.');
        }

        const { error } = await tourPayment(userId!, tourId!);
        if (error) {
          toast.error(error.message);
          router.replace('/tour');
        } else {
          toast.success('결제 되었습니다');
        }
      } catch (err) {
        console.error('Error in getOrderConfirmData:', err);
      }
    };

    getOrderConfirmData();
  }, [orderId, paymentKey, amount, authKey, itemInfo, user]);

  if (!result) return <div>승인 중</div>;

  return (
    <>
      <h1>결제 성공</h1>
      <p>주문번호: {result.orderId}</p>
      <p>{result.orderName}</p>
      <p>결제 금액: {result.totalAmount}원</p>
      <p>결제일: {result.approvedAt.slice(0, 10)}</p>
      <p>
        {result.card &&
          `결제 수단: ${result.method} ${
            result.card.installmentPlanMonths
              ? `${result.card.installmentPlanMonths}개월 할부`
              : '일시불'
          }`}
      </p>
      <p>
        {result.easyPay &&
          `결제 수단: ${result.easyPay.provider} ${result.method}`}
      </p>
    </>
  );
}

export default SuccessPayment;
