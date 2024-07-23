const GoodsOrders = () => {
  return (
    <div>
      <p className='text-2xl mb-9'>굿즈샵 주문/배송조회</p>
      <div>
        <div className='flex gap-10 w-full text-center text-lg mt-3'>
          <p className='ml-24'>상품정보</p>
          <p className='w-80 ml-6'>배송비</p>
          <p className='w-36 ml-8'>진행상태</p>
          <p>리뷰</p>
        </div>
        <div className='border-b-2 border-solid border-white mt-3'></div>
      </div>
    </div>
  );
};

export default GoodsOrders;
