'use client';

import { Suspense } from 'react';
import SuccessPayment from './SuccessPayment';

function SuccessPaymentSection() {
  return (
    <Suspense>
      <SuccessPayment />
    </Suspense>
  );
}

export default SuccessPaymentSection;
