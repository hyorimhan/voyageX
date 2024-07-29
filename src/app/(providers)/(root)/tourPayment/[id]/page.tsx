import Page from '@/components/pages/Page';
import Payment from '@/components/tour/tourPayment/Payment';
import { tourProps } from '@/types/tourPropsType';
import React from 'react';

const TourPaymentPage = ({ params }: tourProps) => {
  return (
    <Page>
      <Payment params={params} />
    </Page>
  );
};

export default TourPaymentPage;
