'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useQuantityStore from '@/zustand/store/useQuantity';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export type Order = {
  orderId: string;
  orderName: string;
  customerName: string;
  customerMobilePhone: string;
  totalPrice: number;
  itemInfo: string;
};

const PaymentWidget = () => {
  const searchParams = useSearchParams();
  const tourTotalPrice = useQuantityStore((state) => state.totalPrice);
  const user = useAuthStore((state) => state.user);
  const query: string = searchParams.get('orderInfo')!;
  const orderInfo: Order = JSON.parse(query);
  const updateInfo = useUpdateInfoStore((state) => state.updateInfo);
  const router = useRouter();

  const userId = user?.id;
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_ANON_KEY!;

  const proceedPayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: orderInfo.orderId,
        orderName: orderInfo.orderName,
        customerName: orderInfo.customerName,
        customerMobilePhone: orderInfo.customerMobilePhone,
        successUrl: `${window.location.origin}/shop/payment/success`,
        failUrl: `${window.location.origin}/shop/payment/fail`,
      });
    } catch (err: any) {
      toast.error(err.message);
      router.back();
    }
  };

  useEffect(() => {
    // 결제창 로드
    const loadWidget = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, userId!);

      // 결제방법 위젯
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        tourTotalPrice || orderInfo.totalPrice, // 구매 가격
      );

      // 약관동의 위젯
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodWidgetRef.current = paymentMethodsWidget;
    };
    loadWidget();
  });
  console.log(updateInfo);
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <div id='payment-widget' className='w-2/3' />
      <div id='agreement' className='w-2/3' />
      <div className='bg-white w-2/3 flex justify-center mb-4'>
        <button
          type='button'
          onClick={proceedPayment}
          className='bg-primary-600 rounded-md p-3 my-4 text-lg transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500'
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentWidget;
