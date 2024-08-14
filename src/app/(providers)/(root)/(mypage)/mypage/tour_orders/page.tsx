import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import TourOrderListMobile from '@/components/mypage/tour_orders/TourOrderListMobile';
import TourOrdersList from '@/components/mypage/tour_orders/TourOrdersList';
import Link from 'next/link';

const TourOrdersPage = () => {
  return (
    <div>
      <div className='flex mb-14 gap-2 sm:mt-8 sm:mb-7'>
        <Link
          href={'mypage/side_bar'}
          className='self-center md:hidden lg:hidden'
        >
          <ArrowLeftIcon24px />
        </Link>
        <p className='text-2xl sm:text-xl'>여행상품 주문/배송조회</p>
      </div>
      <TourOrdersList />
      <TourOrderListMobile />
    </div>
  );
};

export default TourOrdersPage;
