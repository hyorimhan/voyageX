'use client';

import Page from '@/components/pages/Page';
import { tourPayment } from '@/services/tour';
import useAuthStore from '@/zustand/store/useAuth';
import useShopStore from '@/zustand/store/useShop';
// import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function TourSuccess() {
  const user = useAuthStore((state) => state.user);
  const userOrder = useShopStore((state) => state.userOrder);

  const userId = user?.id;
  const tourId = userOrder?.itemInfo;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>();

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  console.log(userId);
  console.log(tourId);
  useEffect(() => {
    if (!orderId || !paymentKey || !amount || !authKey) return;
    const getOrderConfirmData = async () => {
      try {
        // const confirm = await axios.post(
        //   'https://api.tosspayments.com/v1/payments/confirm',
        //   {
        //     paymentKey,
        //     amount,
        //     orderId,
        //   },
        //   {
        //     headers: {
        //       'Authorization': `Basic ${authKey}`,
        //       'Content-Type': 'application/json',
        //     },
        //   },
        // );
        // console.log(confirm.data);
        // setResult(confirm.data);
        // console.log('result => ', result);
        // console.log('Confirm Data:', confirm.data);
        // console.log('Tour ID:', tourId);
        const confirm = await fetch(
          'https://api.tosspayments.com/v1/payments/confirm',
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${authKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentKey,
              amount,
              orderId,
            }),
          },
        );

        if (!confirm.ok) {
          throw new Error(`Request failed with status ${confirm.status}`);
        }

        const confirmData = await confirm.json();
        setResult(confirmData);

        const { error } = await tourPayment(userId!, tourId!);
        console.log('Tour payment response:', error);
        if (error) {
          toast(error.message);
          router.replace('/tour');
        } else {
          toast.success('결제 되었습니다');
        }
      } catch (err) {
        console.error(err);
      }
    };
    getOrderConfirmData();
  }, []);

  if (!result) return <div>승인 중</div>;
  console.log(result);
  return (
    <>
      <Page>
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
      </Page>
    </>
  );
}

export default TourSuccess;
