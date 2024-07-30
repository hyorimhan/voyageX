'use client';
import Page from '@/components/pages/Page';
import SuccessPayment from '@/components/shop/order/payment/SuccessPayment';
import TourSuccess from '@/components/tour/tourPayment/TourSuccess';
import useShopStore from '@/zustand/store/useShop';
import { Suspense } from 'react';

const SuccessPage = () => {
  const orderType = useShopStore((state) => state.orderType);

  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <Suspense>
          <SuccessPayment />
        </Suspense>
      </Page>
    </>
  );
};

export default SuccessPage;
