'use client';

import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import CustomerInfo from './CustomerInfo';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useFetchAddresses } from '@/hooks/useAddresses';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';

interface OrderFormPropsType {
  user: User;
}

function OrderForm({ user }: OrderFormPropsType) {
  const user_id = user.id;
  const user_email = user.email ?? '이메일을 입력해주세요.';
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: addressList, isError, isPending } = useFetchAddresses(user_id);

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;
  return (
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] gap-x-10'>
        <div className='flex flex-col items-start'>
          <div className='mt-4 w-full'>
            {addressList && <ExpressInfo addressList={addressList} />}
          </div>
          <div className='mt-4 w-full'>
            {addressList && (
              <CustomerInfo user_email={user_email} addressList={addressList} />
            )}
          </div>
          <div className='mt-4 w-full'>
            <OrderList label='상품정보' setTotalPrice={setTotalPrice} />
          </div>
        </div>
        <div>
          <OrderSummary totalPrice={totalPrice} />
          <PayButton totalPrice={totalPrice} />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
