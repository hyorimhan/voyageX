import TourOrderListMobile from '@/components/mypage/tour_orders/TourOrderListMobile';
import TourOrdersList from '@/components/mypage/tour_orders/TourOrdersList';

const TourOrdersPage = () => {
  return (
    <div>
      <p className='text-2xl mb-14'>여행상품 주문/배송조회</p>
      <TourOrdersList />
      <TourOrderListMobile />
    </div>
  );
};

export default TourOrdersPage;
