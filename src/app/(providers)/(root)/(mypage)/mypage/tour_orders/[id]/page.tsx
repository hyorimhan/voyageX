import TourOrderDetailDeleteBtn from '@/components/mypage/tour_orders/TourOrderDetailDeleteBtn';
import TourOrderDetailList from '@/components/mypage/tour_orders/TourOrderDetailList';

type Params = {
  params: {
    id: string;
  };
};

const page = ({ params }: Params) => {
  return (
    <>
      <div className='flex items-start justify-between'>
        <p className='text-2xl font-semibold mb-4'>주문상세내역</p>
        <TourOrderDetailDeleteBtn order_id={params.id} />
      </div>
      <TourOrderDetailList order_id={params.id} />
    </>
  );
};

export default page;
