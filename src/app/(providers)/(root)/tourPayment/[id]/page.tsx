import Payment from '@/components/tour/tourPayment/Payment';
import { tourProps } from '@/types/tourPropsType';
import React from 'react';

const TourPaymentPage = ({ params }: tourProps) => {
  return (
    <div>
      <Payment params={params} />
    </div>
  );
};

export default TourPaymentPage;
