'use client';

import { Suspense } from 'react';
import TourPaymentSuccess from './TourPaymentSuccess';

function TourPaymentSuccessSection() {
  return (
    <Suspense>
      <TourPaymentSuccess />
    </Suspense>
  );
}

export default TourPaymentSuccessSection;
