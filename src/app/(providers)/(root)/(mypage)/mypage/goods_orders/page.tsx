import GoodsOrderList from '@/components/mypage/goods_orders/GoodsOrderList';

const GoodsOrdersPage = () => {
  return (
    <div>
      <p className='text-2xl mb-9'>굿즈샵 주문/배송조회</p>
      <div>
        <div className='flex text-lg mt-3 text-center'>
          <p className='flex w-[457px] justify-center'>상품정보</p>
          <div className='flex items-end gap-4 justify-end ml-[111px] '>
            <p className='w-[79px]'>배송비</p>
            <p className='w-[79px]'>진행상태</p>
            <p className='w-[78px]'>리뷰</p>
          </div>
        </div>
        <div className='border-b-[1px] border-solid border-white mt-[5px]'></div>
      </div>
      <GoodsOrderList />
    </div>
  );
};

export default GoodsOrdersPage;
