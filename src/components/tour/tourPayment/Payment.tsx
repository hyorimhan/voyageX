import { tourProps } from '@/types/tourPropsType';
import React from 'react';

function Payment({ params }: tourProps) {
  const { id } = params;
  
  return <div>Payment</div>;
}

export default Payment;
