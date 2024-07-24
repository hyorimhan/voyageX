'use client';

import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Order = {
  orderId: string;
  orderName: string;
  customerName: string;
  customerMobilePhone: string;
  products: [
    {
      name: string;
      quantity: number;
      unitAmount: number;
      currency: string;
      description: string;
    },
  ];
  totalPrice: number;
};

const PaymentWidget = () => {
  const searchParams = useSearchParams();
  const query: string = searchParams.get('currentOrder')!;
  const currentOrder: Order = JSON.parse(query);
  console.log(currentOrder);
  const userId = 'gusdnr0839';
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_ANON_KEY!;

  const proceedPayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: currentOrder.orderId,
        orderName: currentOrder.orderName,
        customerName: currentOrder.customerName,
        customerMobilePhone: currentOrder.customerMobilePhone,
        products: currentOrder.products,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (err: any) {
      alert(err);
    }
  };

  useEffect(() => {
    // 결제창 로드
    const loadWidget = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, userId);

      // 결제방법 위젯
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        currentOrder.totalPrice, // 구매 가격
      );

      // 약관동의 위젯
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodWidgetRef.current = paymentMethodsWidget;
    };
    loadWidget();
  });
  return (
    <div>
      <div id='payment-widget' />
      <div id='agreement' />
      <button type='button' onClick={proceedPayment}>
        결제하기
      </button>
    </div>
  );
};

export default PaymentWidget;
