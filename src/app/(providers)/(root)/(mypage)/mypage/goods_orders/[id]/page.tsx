import GoodsOrderDetailList from '@/components/mypage/goods_orders/GoodsOrderDetailList';

type Params = {
  params: {
    id: string;
  };
};

const GoodsOrdersDetailPage = ({ params }: Params) => {
  return (
    <>
      <p className='text-2xl font-semibold mb-4'>주문상세내역</p>
      <GoodsOrderDetailList order_id={params.id} />
    </>
  );
};

export default GoodsOrdersDetailPage;
