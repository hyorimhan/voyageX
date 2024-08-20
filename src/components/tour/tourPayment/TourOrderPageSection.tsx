'use client';

import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import OrderForm from '@/components/order/OrderForm';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import { orbitron } from '../../../../public/fonts/orbitron';

function TourOrderPageSection() {
  const { user } = useAuthStore((state) => state);
  const router = useRouter();
  return (
    <>
      <h1
        className={`sm:hidden text-[28px] font-semibold text-white mt-16 py-4`}
      >
        여행상품 결제
      </h1>
      <div className='md:hidden lg:hidden px-4 flex flex-row gap-2 text-xl font-medium text-white mt-16 py-4'>
        <button onClick={() => router.back()}>
          <ArrowLeftIcon24px />
        </button>
        여행상품 결제
      </div>
      {user && <OrderForm user={user} isTour={true} />}
    </>
  );
}

export default TourOrderPageSection;
