'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

type Order = {
  orderId: string;
  orderName: string;
};

const GoodsPaymentWidget = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const { goodsOrderInfo } = useGoodsOrderStore((state) => state);
  const { tourOrder } = useTourOrderInfoStore((state) => state);
  const query: string = searchParams.get('orderInfo')!;
  const orderInfo: Order = JSON.parse(query);
  const isTourQuery = searchParams.get('isTour')!;
  const isTour: boolean = JSON.parse(isTourQuery);

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
        successUrl: isTour
          ? `${window.location.origin}/tour/payment/success`
          : `${window.location.origin}/shop/payment/success`,
        failUrl: `${window.location.origin}/shop/payment/fail`,
      });
    } catch (err: any) {
      toast.error(err.message);
      router.back();
    }
  };

  useEffect(() => {
    // 총 결제금액 계산
    let totalPrice: number = 0;
    if (isTour) {
      totalPrice = tourOrder?.price!;
    } else {
      totalPrice = goodsOrderInfo?.reduce((total, item) => {
        const price = item.goods.goods_price;
        const quantity = item.quantity;
        return total + price * quantity;
      }, 0)!;
    }

    // 결제창 로드
    const loadWidget = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, userId!);

      // 결제방법 위젯
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        totalPrice, // 구매 가격
      );

      // 약관동의 위젯
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodWidgetRef.current = paymentMethodsWidget;
    };
    loadWidget();
  });
  return (
    <div className='flex flex-col justify-center items-center mt-10 sm:x-[375px]'>
      <div id='payment-widget' className='lg:w-2/3 md:w-2/3' />
      <div id='agreement' className='lg:w-2/3 md:w-2/3' />
      <div className='bg-white lg:w-2/3 md:w-2/3 sm:w-[300px] flex justify-center mb-4'>
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

export default GoodsPaymentWidget;
