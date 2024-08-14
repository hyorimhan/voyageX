import Link from 'next/link';

function AfterPayButtons({ orderId }: { orderId: string }) {
  return (
    <div className='flex gap-4 w-[480px] sm:w-full sm:mx-auto'>
      <div className='sm:flex-grow'>
        <Link href={`/mypage/tour_orders/${orderId}`}>
          <button className='border-[2px] w-[232px] sm:w-full border-primary-400 h-[51px]  rounded-lg bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300'>
            주문상세 보기
          </button>
        </Link>
      </div>
      <div className='sm:flex-grow'>
        <Link href={'/tour'}>
          <button className=' sm:w-full w-[232px] bg-primary-600 h-[51px] rounded-lg duration-200 hover:bg-primary-400 active:bg-primary-500'>
            쇼핑 계속하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AfterPayButtons;
