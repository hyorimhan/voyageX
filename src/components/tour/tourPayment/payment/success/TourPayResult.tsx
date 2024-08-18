'use client';

import PriceInfo from '@/components/order/payment/success/PriceInfo';
import AfterPayButtons from './AfterPayButtons';
import OrderedTourInfo from './OrderedTourInfo';
import OrderedTourInfoMobile from './OrderedTourInfoMobile';
import PayMethodInfo from '@/components/order/payment/success/PayMethodInfo';
import usePayResultStore from '@/zustand/store/usePayResultStore';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import Loading from '@/components/common/Loading';

function TourPayResult() {
  const { payResult } = usePayResultStore((state) => state);
  const { tourOrder } = useTourOrderInfoStore((state) => state);

  if (!payResult || !tourOrder) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className='md:mx-5 sm:mx-5'>
      <div className='flex md:grid sm:grid md:grid-cols-1 sm:grid-cols-1 mt-[128px] mb-10 items-center justify-between'>
        <div className=' max-full'>
          <div className='text-4xl font-semibold sm:text-xl border-white text-white'>
            주문이 완료되었습니다
          </div>
        </div>
        <div>
          <div className='sm:mb-5 md:mb-8 lg:mb-8 lg:hidden sm:mt-5 md:mt-4 sm:text-sm'>
            주문상품 번호{' '}
            <span className='font-semibold'>{payResult.orderId}</span>
          </div>
          <AfterPayButtons orderId={payResult.orderId} />
        </div>
      </div>
      <div className='mb-8 sm:hidden md:hidden'>
        주문상품 번호 {payResult.orderId}
      </div>
      <div className='sm:hidden'>
        <OrderedTourInfo tourOrder={tourOrder} />
      </div>
      <div className='md:hidden lg:hidden'>
        <OrderedTourInfoMobile tourOrder={tourOrder} />
      </div>
      <div className='sm:mt-5 md:mt-8 lg:mt-8 mx-auto max-w-[1120px] flex sm:flex-col sm:gap-5 md:flex-wrap lg:flex-wrap md:gap-8 lg:gap-8 sm:mb-20 md:mb-10 lg:mb-10'>
        <PriceInfo amount={+payResult.totalAmount} />
        <PayMethodInfo result={payResult} />
      </div>
    </div>
  );
}

export default TourPayResult;
