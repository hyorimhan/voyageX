import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import GoodsOrderDetailDeleteBtn from '@/components/mypage/goods_orders/GoodsOrderDetailDeleteBtn';
import GoodsOrderDetailList from '@/components/mypage/goods_orders/GoodsOrderDetailList';
import Link from 'next/link';

type Params = {
  params: {
    id: string;
  };
};

const GoodsOrdersDetailPage = ({ params }: Params) => {
  return (
    <>
      <div className='flex items-start justify-between sm:mt-8'>
        <div className='flex mb-4 gap-2'>
          <Link
            href={'/mypage/side_bar'}
            className='self-center md:hidden lg:hidden'
          >
            <ArrowLeftIcon24px />
          </Link>
          <p className='text-2xl font-semibold sm:text-xl'>주문상세내역</p>
        </div>
        <GoodsOrderDetailDeleteBtn order_id={params.id} />
      </div>
      <GoodsOrderDetailList order_id={params.id} />
    </>
  );
};

export default GoodsOrdersDetailPage;
