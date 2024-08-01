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
        <Suspense>
          <SuccessPayment tourUrl={tourUrl as string} />
        </Suspense>
      </Page>
    </>
  );
};

export default SuccessPage;
