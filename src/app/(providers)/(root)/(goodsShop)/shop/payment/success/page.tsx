import SuccessPayment from '@/components/order/payment/success/SuccessPayment';
import Page from '@/components/pages/Page';
import { Suspense } from 'react';

const SuccessPage = () => {
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
