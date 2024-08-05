'use client';

import useAuthStore from '@/zustand/store/useAuth';
import OrderForm from './OrderForm';

function OrderPageSection() {
  const { user } = useAuthStore((state) => state);

  return (
    <>
      <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
        GOODS SHOP
      </h1>
      {user && <OrderForm user={user} isTour={false} />}
    </>
  );
}

export default OrderPageSection;
