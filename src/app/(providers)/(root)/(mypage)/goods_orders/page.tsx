import Image from 'next/image';

const GoodsOrdersPage = () => {
  return (
    <div>
      <p className='text-2xl mb-9'>굿즈샵 주문/배송조회</p>
      <div>
        <div className='flex w-full justify-end text-lg mt-3 gap-9 px-7'>
          <p className='w-72'>상품정보</p>
          <p className='mr-5'>배송비</p>
          <p>진행상태</p>
          <p>리뷰</p>
        </div>
        <div className='border-b-2 border-solid border-white mt-3'></div>
      </div>
      <div className='py-4'>
        <p>주문일자 2024. 07. 12</p>
        <div className='flex justify-between'>
          <div className='flex gap-5 mt-2'>
            <Image
              src='/images/goodsItem.svg'
              alt='goodsItem'
              width={100}
              height={100}
            />
            <div className='gap-4 flex flex-col'>
              <p>New Glenn Technical Tee</p>
              <p className='font-bold text-2xl'>52,000원</p>
              <p>수량 1개</p>
            </div>
          </div>
          <div className='flex gap-14 text-center w-72'>
            <p>무료배송</p>
            <p>구매확정</p>
            <p> - </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsOrdersPage;
