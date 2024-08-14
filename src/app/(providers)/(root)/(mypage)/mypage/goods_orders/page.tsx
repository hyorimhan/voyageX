import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import GoodsOrderList from '@/components/mypage/goods_orders/GoodsOrderList';
import Link from 'next/link';

const GoodsOrdersPage = () => {
  return (
    <div>
      <div className='flex mb-9 gap-2 sm:mt-8'>
        <Link
          href={'mypage/side_bar'}
          className='md:hidden lg:hidden self-center'
        >
          <ArrowLeftIcon24px />
        </Link>
        <p className='text-2xl sm:text-xl'>굿즈샵 주문/배송조회</p>
      </div>
      <div>
        <div className='flex text-lg mt-3 text-center sm:hidden'>
          <p className='flex w-[457px] justify-center'>상품정보</p>
          <div className='flex items-end gap-4 justify-end ml-[111px] '>
            <p className='w-[79px]'>배송비</p>
            <p className='w-[79px]'>진행상태</p>
            <p className='w-[78px]'>리뷰</p>
          </div>
        </div>
        <div className='border-b-[1px] border-solid border-white mt-[5px] sm:hidden'></div>
      </div>
      <GoodsOrderList />
    </div>
  );
};

export default GoodsOrdersPage;
