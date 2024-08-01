'use client';
import SuccessPayment from '@/components/order/payment/success/SuccessPayment';
import Page from '@/components/pages/Page';
import { Suspense } from 'react';

const SuccessPage = () => {
  return (
    <>
      <Page>
        <Suspense>
          <SuccessPayment />
        </Suspense>
      </Page>
    </>
  );
};

export default SuccessPage;
