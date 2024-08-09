import TourOrderPageSection from '@/components/tour/tourPayment/TourOrderPageSection';
import React from 'react';
import { orbitron } from '../../../../../../../public/fonts/orbitron';

const TourPaymentPage = () => {
  return (
    <>
      <h1
        className={`border-b sm:mx-5 border-white text-lg font-bold text-white mt-20 py-4 ${orbitron.className}`}
      >
        TOUR ORDER
      </h1>
      <TourOrderPageSection />
    </>
  );
};

export default TourPaymentPage;
