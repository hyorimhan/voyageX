'use client';

import useAuthStore from '@/zustand/store/useAuth';
import OrderForm from './OrderForm';
import { orbitron } from '../../../public/fonts/orbitron';
import ArrowLeftIcon24px from '../common/icons/24px/ArrowLeftIcon24px';
import { useRouter } from 'next/navigation';

function OrderPageSection() {
  const { user } = useAuthStore((state) => state);
  const router = useRouter();

  return (
    <>
      <h1
        className={`sm:hidden border-b-[1px] border-white text-[28px] font-semibold text-white mt-16 py-4 ${orbitron.className}`}
      >
        GOODS SHOP
      </h1>
      <div className='md:hidden lg:hidden px-4 flex flex-row gap-2 text-xl font-medium text-white mt-16 py-4'>
        <button onClick={() => router.back()}>
          <ArrowLeftIcon24px />
        </button>
        굿즈샵 상품 결제
      </div>
      {user && <OrderForm user={user} isTour={false} />}
    </>
  );
}

export default OrderPageSection;
