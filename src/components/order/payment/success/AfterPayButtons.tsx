import Link from 'next/link';

function AfterPayButtons({ orderId }: { orderId: string }) {
  return (
    <div className='flex gap-4 sm:w-[335px] md:w-[480px] lg:w-[480px] sm:mx-auto'>
      <div className='sm:flex-grow'>
        <Link href={`/mypage/goods_orders/${orderId}`}>
          <button className='border-[2px] sm:w-[159.5px] md:w-[232px] lg:w-[232px] border-primary-400 h-[51px] rounded-lg bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300'>
            주문상세 보기
          </button>
        </Link>
      </div>
      <div className='sm:flex-grow'>
        <Link href={'/shop'}>
          <button className='sm:w-[159.5px] md:w-[232px] lg:w-[232px] bg-primary-600 h-[51px] rounded-lg duration-200 hover:bg-primary-400 active:bg-primary-500'>
            쇼핑 계속하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AfterPayButtons;
