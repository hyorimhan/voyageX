import Link from 'next/link';

function AfterPayButtons() {
  return (
    <div className='flex gap-4 w-[571px] '>
      <div>
        <Link href={`/mypage/tour_orders`}>
          <button className='border-[1.5px] border-primary-400 h-[53px] w-[277.5px] rounded-lg bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300'>
            주문상세 보기
          </button>
        </Link>
      </div>
      <div>
        <Link href={'/tour'}>
          <button className=' bg-primary-600 h-[53px] w-[277.5px] rounded-lg duration-200 hover:bg-primary-400 active:bg-primary-500'>
            쇼핑 계속하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AfterPayButtons;
