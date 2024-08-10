'use client';

import useAuthStore from '@/zustand/store/useAuth';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import OrderedGoodsList from './OrderedGoodsList';
import AddressInfo from './AddressInfo';
import PriceInfo from './PriceInfo';
import PayMethodInfo from './PayMethodInfo';
import AfterPayButtons from './AfterPayButtons';
import { createOrderReceipt } from '@/services/pay';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import { deleteCartItemByGoodsId } from '@/services/goods';

function SuccessPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>();

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

      const response = await createOrderReceipt({
        user_id: user.id,
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
      console.log('response => ', response);
    };
    postReceipt();
    return () => {
      const ids = goodsOrderInfo?.map((item) => item.goods.id);
      const response = deleteCartItemByGoodsId({ user_id: user.id, ids: ids! });
      console.log('deleteCartItemByGoodsId response => ', response);
      setGoodsOrderInfo(null);
    };
  }, [
    result,
    customerInfo,
    expressAddress,
    goodsOrderInfo,
    orderId,
    setGoodsOrderInfo,
    user,
  ]);

  if (!result || !goodsOrderInfo)
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
    <>
      <div className='lg:flex sm:mx-5 sm:grid-cols-2 mt-[137px] mb-11 items-center justify-between'>
        <div className=' border-white text-4xl font-bold text-white lg:w-[330px]'>
          주문이 완료되었습니다
        </div>
        <AfterPayButtons />
      </div>

      <div className='mb-8 sm:mx-5'>주문상품 번호 {result.orderId}</div>
      <OrderedGoodsList goodsOrderInfo={goodsOrderInfo} />
      <div className='mt-8 mx-auto max-w-[1120px] flex flex-wrap gap-8 mb-10 sm:mx-5'>
        <AddressInfo
          expressAddress={expressAddress}
          customerInfo={customerInfo!}
        />
        <PriceInfo amount={+amount} />
        <PayMethodInfo result={result} />
      </div>
    </>
  );
}

export default SuccessPayment;
