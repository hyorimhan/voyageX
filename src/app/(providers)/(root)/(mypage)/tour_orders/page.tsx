import React from 'react';

const TourOrders = () => {
  return (
    <div>
      <p className='text-4xl'>여행상품 주문/배송조회</p>
      <div>
        <p>2024. 07. 12. 금</p>
        <div className='flex gap-20'>
          <div>
            <p>FROM</p>
            <p>SEOUL</p>
            <p>KOREA EARTH</p>
            <p className='mt-4'>JULY 08, 2029</p>
            <p>11:30 AM</p>
          </div>
          <div>
            <p>TO</p>
            <p>MOON</p>
            <p>UNIVERSE</p>
            <p className='mt-4'>JULY 08, 2029</p>
            <p>11:30 AM</p>
          </div>
          <div>
            <p className='text-center mb-3 font-bold '>Boarding Pass</p>
            <div className='flex gap-20'>
              <div>
                <p>FROM</p>
                <p>SEOUL</p>
                <p>KOREA EARTH</p>
                <p className='mt-4'>JULY 08, 2029</p>
                <p>11:30 AM</p>
              </div>
              <div>
                <p>TO</p>
                <p>MOON</p>
                <p>UNIVERSE</p>
                <p className='mt-4'>JULY 08, 2029</p>
                <p>11:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOrders;
