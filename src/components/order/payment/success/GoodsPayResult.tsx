'use client';

import usePayResultStore from '@/zustand/store/usePayResultStore';
import AddressInfo from './AddressInfo';
import AfterPayButtons from './AfterPayButtons';
import OrderedGoodsList from './OrderedGoodsList';
import PayMethodInfo from './PayMethodInfo';
import PriceInfo from './PriceInfo';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import Loading from '@/components/common/Loading';

function GoodsPayResult() {
  const { payResult } = usePayResultStore((state) => state);
  const { goodsOrderInfo } = useGoodsOrderStore((state) => state);
  const { expressAddress } = useExpressInfoStore((state) => state);
  const { customerInfo } = useCustomerInfoStore((state) => state);

  if (!payResult || !goodsOrderInfo || !expressAddress || !customerInfo) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='flex md:grid sm:grid md:grid-cols-1 sm:grid-cols-1 mt-[128px] sm:mb-5 md:mb-10 lg:mb-10 items-center justify-between'>
        <div className='max-full'>
          <div className=' border-white sm:text-2xl sm:mx-5 md:text-4xl lg:text-4xl font-semibold text-white'>
            주문이 완료되었습니다
          </div>
        </div>
        <div className='sm:hidden'>
          <AfterPayButtons orderId={payResult.orderId} />
        </div>
      </div>
      <div>
        <div className='sm:mb-5 md:mb-8 lg:mb-8 font-semibold sm:mx-5'>
          주문상품 번호 {payResult.orderId}
        </div>
        <div className='md:hidden lg:hidden'>
          <AfterPayButtons orderId={payResult.orderId} />
        </div>
      </div>
      <OrderedGoodsList goodsOrderInfo={goodsOrderInfo!} />
      <div className='sm:mt-5 md:mt-8 lg:mt-8 mx-auto max-w-[1120px] flex sm:flex-col sm:gap-5 md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap md:gap-8 lg:gap-8 sm:mb-20 md:mb-10 lg:mb-10 sm:mx-5'>
        <AddressInfo
          expressAddress={expressAddress}
          customerInfo={customerInfo}
        />
        <PriceInfo amount={payResult.totalAmount} />
        <PayMethodInfo result={payResult} />
      </div>
    </>
  );
}

export default GoodsPayResult;
