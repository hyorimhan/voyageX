'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useShopStore from '@/zustand/store/useShop';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export type Order = {
  orderId: string;
  orderName: string;
  customerName: string;
  customerMobilePhone: string;
  itemInfo: string;
  totalPrice: number;
};

const TourPayWidget = () => {
  const userOrder = useShopStore((state) => state.userOrder);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  // const searchParams = useSearchParams();
  // const query: string = searchParams.get('orderInfo')!;
  // const orderInfo: Order = JSON.parse(query);
  // console.log('orderInfo => ', orderInfo);
  // const userId = 'gusdnr0839';
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_ANON_KEY!;

  const proceedPayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: userOrder?.orderId!,
        orderName: userOrder?.orderName!,
        customerName: userOrder?.customerName,
        customerMobilePhone: userOrder?.customerMobilePhone,
        successUrl: `${window.location.origin}/tour/payment/success`,
        failUrl: `${window.location.origin}/tour/payment/fail`,
      });
    } catch (err: any) {
      toast(err.message || '결제 중 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    // 결제창 로드
    const loadWidget = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, userId!);

      // 결제방법 위젯
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        userOrder?.totalPrice!, // 구매 가격
      );

      // 약관동의 위젯
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodWidgetRef.current = paymentMethodsWidget;
    };
    loadWidget();
  }, []);
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <div id='payment-widget' className='w-2/3' />
      <div id='agreement' className='w-2/3' />
      <div className='bg-white w-2/3 flex justify-center mb-4'>
        <button
          type='button'
          onClick={proceedPayment}
          className='bg-[#4D367C] rounded-md p-3 my-4 text-lg'
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default TourPayWidget;
