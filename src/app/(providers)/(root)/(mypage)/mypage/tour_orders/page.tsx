import TourOrderListMobile from '@/components/mypage/tour_orders/TourOrderListMobile';
import TourOrdersList from '@/components/mypage/tour_orders/TourOrdersList';
import Link from 'next/link';

const TourOrdersPage = () => {
  return (
    <div>
      <Link href={'/mypage/side_bar'} className='text-2xl mb-14'>
        여행상품 주문/배송조회
      </Link>
      <TourOrdersList />
      <TourOrderListMobile />
    </div>
  );
};

export default TourOrdersPage;
