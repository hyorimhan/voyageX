'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { createOrderReceipt } from '@/services/pay';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import { deleteCartItemByGoodsId } from '@/services/goods';
import usePayResultStore from '@/zustand/store/usePayResultStore';
import Loading from '@/components/common/Loading';

function SuccessPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  const { user } = useAuthStore((state) => state);
  const { expressAddress } = useExpressInfoStore((state) => state);
  const { customerInfo } = useCustomerInfoStore((state) => state);
  const { goodsOrderInfo, setGoodsOrderInfo } = useGoodsOrderStore(
    (state) => state,
  );
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
      } catch (error) {}
    };
    if (!payResult) {
      getOrderConfirm();
    } else {
      const postReceipt = async () => {
        let pay_method: string = '';
        let installment: number = 0;
        if (payResult.card && !payResult.easyPay) {
          pay_method = payResult.method;
          installment = payResult.card.installmentPlanMonths;
        } else if (payResult.easyPay && !payResult.card) {
          pay_method = `${payResult.easyPay.provider} ${payResult.method}`;
        } else if (payResult.card && payResult.easyPay) {
          pay_method = `${payResult.easyPay.provider} ${payResult.method}`;
          installment = payResult.card.installmentPlanMonths;
        }

        await createOrderReceipt({
          user_id: user!.id,
          order_id: orderId,
          goodsList: goodsOrderInfo!,
          customer: customerInfo!,
          pay_method,
          installment,
          address: expressAddress?.address!,
          old_address: expressAddress?.oldAddress!,
          detail_address: expressAddress?.detailAddress!,
          postcode: expressAddress?.postcode!,
        });
      };
      postReceipt();
      router.push(`/shop/payment/success/result`);
      return () => {
        const ids = goodsOrderInfo?.map((item) => item.goods.id);
        deleteCartItemByGoodsId({ user_id: user!.id, ids: ids! });
      };
    }
  });

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

export default SuccessPayment;
