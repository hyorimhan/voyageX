'use client';

import { tourPayment } from '@/services/tour';
import useAuthStore from '@/zustand/store/useAuth';
import useShopStore from '@/zustand/store/useShop';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function SuccessPayment() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const userOrder = useShopStore((state) => state.userOrder);

  // 투어 관련
  const userId = user?.id;
  const tourId = userOrder?.itemInfo;
  const orderId = userOrder?.orderId;

  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>('');

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const paymentKey = searchParams.get('paymentKey')!;
  const authKey = btoa(secretKey + ':')!;

  // const orderId = searchParams.get('orderId')!;
  // const amount = searchParams.get('amount')!;
  console.log(result);
  useEffect(() => {
    if (!orderId || !paymentKey || !authKey) return;
    const getOrderConfirmData = async () => {
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
        console.log(confirm.data);
        setResult(confirm.data);
        console.log('result => ', result);

        // 투어 상품 insert 테이블
        const { error } = await tourPayment(userId!, tourId!);
        if (error) {
          toast(error.message);
          router.replace('/tour');
        } else {
          toast.success('결제 되었습니다');
        }
      } catch (err) {
        console.error(err);
        router.replace('/tour');
      }
    };
    getOrderConfirmData();
  }, []);

  if (!result) return <div>승인 오류</div>;

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
