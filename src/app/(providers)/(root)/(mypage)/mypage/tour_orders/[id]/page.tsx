import TourOrderDetailList from '@/components/mypage/tour_orders/TourOrderDetailList';

type Params = {
  params: {
    id: string;
  };
};

const page = ({ params }: Params) => {
  return (
    <>
      <p className='text-2xl font-semibold mb-4'>주문상세내역</p>
      <TourOrderDetailList order_id={params.id} />
    </>
  );
};

export default page;
