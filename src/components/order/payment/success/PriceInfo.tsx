interface PriceInfoPropsType {
  amount: number;
}

function PriceInfo({ amount }: PriceInfoPropsType) {
  return (
    <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
      <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
        결제 정보
      </div>
      <div className='mt-4 flex justify-between'>
        <div className='w-[80px] text-sm text-black-200 font-medium'>
          총 주문 금액{' '}
        </div>
        <span className='text-sm text-black-50 font-medium'>
          {amount.toLocaleString()}
          <span className='text-base text-white font-normal ml-1'>원</span>
        </span>
      </div>
      <div className='flex justify-between py-5 w-full border-b-black-700 border-b-[1px]'>
        <div className='w-[80px] text-sm text-black-200 font-medium'>
          총 배송비
        </div>
        <span className='text-sm text-white font-medium'>
          0<span className='text-base text-white font-normal ml-1'>원</span>
        </span>
      </div>
      <div className='flex justify-between pt-5'>
        <div className='w-[80px] text-sm text-black-200 font-medium'>
          총 결제 금액{' '}
        </div>
        <span className='text-base text-white font-semibold'>
          {amount.toLocaleString()}
          <span className='text-base text-white font-normal ml-1'>원</span>
        </span>
      </div>
    </div>
  );
}

export default PriceInfo;
