import GoodsOrderDetailDeleteBtn from '@/components/mypage/goods_orders/GoodsOrderDetailDeleteBtn';
import GoodsOrderDetailList from '@/components/mypage/goods_orders/GoodsOrderDetailList';

type Params = {
  params: {
    id: string;
  };
};

const GoodsOrdersDetailPage = ({ params }: Params) => {
  return (
    <>
      <div className='flex items-start justify-between'>
        <p className='text-2xl font-semibold mb-4'>주문상세내역</p>
        <GoodsOrderDetailDeleteBtn order_id={params.id} />
      </div>
      <GoodsOrderDetailList order_id={params.id} />
    </>
  );
};

export default GoodsOrdersDetailPage;
