'use client';

import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import CustomerInfo from './CustomerInfo';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useFetchAddresses } from '@/hooks/useAddresses';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import Loading from '../common/Loading';
import TourInfo from './TourInfo';

interface OrderFormPropsType {
  user: User;
  isTour: boolean;
}

function OrderForm({ user, isTour }: OrderFormPropsType) {
  const user_id = user.id;
  const user_email = user.email ?? '이메일을 입력해주세요.';
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: addressList, isError, isPending } = useFetchAddresses(user_id);

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;
  return (
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] md:grid-cols-1 md:mx-5 md:mb-20 sm:mb-20 sm:grid-cols-1 sm:mx-5 gap-x-10'>
        <div className='mt-1'>
          <div className='mt-5 w-full'>
            {addressList && (
              <CustomerInfo
                isTour={isTour}
                user_email={user_email}
                addressList={addressList}
              />
            )}
          </div>
          <div className='mt-5 w-full'>
            {addressList && !isTour && (
              <ExpressInfo addressList={addressList} />
            )}
          </div>
          <div className='mt-5 w-full'>
            {isTour ? (
              <TourInfo setTotalPrice={setTotalPrice} />
            ) : (
              <OrderList setTotalPrice={setTotalPrice} />
            )}
          </div>
        </div>
        <div className='lg:mt-1'>
          <div className='mt-5 w-full'>
            <OrderSummary totalPrice={totalPrice} />
          </div>
          <div className='mt-5 w-full'>
            <PayButton totalPrice={totalPrice} isTour={isTour} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderForm;
