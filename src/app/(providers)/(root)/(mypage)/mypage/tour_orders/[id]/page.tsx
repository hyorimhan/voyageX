import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import TourOrderDetailDeleteBtn from '@/components/mypage/tour_orders/TourOrderDetailDeleteBtn';
import TourOrderDetailList from '@/components/mypage/tour_orders/TourOrderDetailList';
import Link from 'next/link';

type Params = {
  params: {
    id: string;
  };
};

const page = ({ params }: Params) => {
  return (
    <>
      <div className='flex items-start justify-between'>
        <div className='flex mb-4 gap-2'>
          <Link
            href={'/mypage/tour_orders'}
            className='flex md:hidden lg:hidden'
          >
            <ArrowLeftIcon24px />
          </Link>
          <p className='text-2xl font-semibold '>주문상세내역</p>
        </div>
        <TourOrderDetailDeleteBtn order_id={params.id} />
      </div>
      <TourOrderDetailList order_id={params.id} />
    </>
  );
};

export default page;
