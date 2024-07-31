'use client';
import SuccessPayment from '@/components/order/payment/success/SuccessPayment';
import Page from '@/components/pages/Page';
import useTourIdStore from '@/zustand/store/useTourId';
import { Suspense } from 'react';

const SuccessPage = () => {
  const tourUrl = useTourIdStore((state) => state.tourUrl);
  console.log('sPage', tourUrl);
  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <Suspense>
          <SuccessPayment tourUrl={tourUrl as string} />
        </Suspense>
      </Page>
    </>
  );
};

export default SuccessPage;
