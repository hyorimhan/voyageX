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
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] gap-x-10'>
        <div className='flex flex-col items-start'>
          <div className='mt-4 w-full'>
            {addressList && !isTour && (
              <ExpressInfo addressList={addressList} />
            )}
          </div>
          <div className='mt-4 w-full'>
            {addressList && (
              <CustomerInfo user_email={user_email} addressList={addressList} />
            )}
          </div>
          <div className='mt-4 w-full'>
            {isTour ? (
              <TourInfo setTotalPrice={setTotalPrice} />
            ) : (
              <OrderList setTotalPrice={setTotalPrice} />
            )}
          </div>
        </div>
        <div>
          <OrderSummary totalPrice={totalPrice} />
          <PayButton totalPrice={totalPrice} isTour={isTour} />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
