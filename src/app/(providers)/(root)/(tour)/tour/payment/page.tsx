import TourOrderPageSection from '@/components/tour/tourPayment/TourOrderPageSection';
import React from 'react';
import { orbitron } from '../../../../../../../public/fonts/orbitron';

const TourPaymentPage = () => {
  return (
    <>
      <h1
        className={`border-b-[1px] sm:mx-5 border-white text-lg font-semibold text-white mt-20 py-4 ${orbitron.className}`}
      >
        여행상품 결제
      </h1>
      <TourOrderPageSection />
    </>
  );
};

export default TourPaymentPage;
