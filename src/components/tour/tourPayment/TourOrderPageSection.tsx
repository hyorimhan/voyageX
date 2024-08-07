'use client';

import OrderForm from '@/components/order/OrderForm';
import useAuthStore from '@/zustand/store/useAuth';

function TourOrderPageSection() {
  const { user } = useAuthStore((state) => state);
  return <>{user && <OrderForm user={user} isTour={true} />}</>;
}

export default TourOrderPageSection;
