interface OrderSummaryPropsType {
  totalPrice: number;
}

function OrderSummary({ totalPrice }: OrderSummaryPropsType) {
  return (
    <div className='border-[1px] border-black-300 rounded-lg sm:p-4 md:pt-4 md:px-5 md:pb-5 lg:pt-4 lg:px-5 lg:pb-5'>
      <div className='pt-1 pb-3 h-[50px] mb-4 border-b border-black-700 flex flex-row items-start justify-between '>
        <span className='text-xl font-medium'>주문 요약</span>
      </div>
      <div className='flex flex-col items-start gap-4'>
        <div className='w-full flex justify-between'>
          <span className='text-black-200'>총 주문 금액</span>
          <span className='text-black-50'>
            {totalPrice.toLocaleString()}
            <span className='font-normal'>원</span>
          </span>
        </div>
        <div className='w-full flex justify-between'>
          <span className='text-black-200'>총 배송비</span>
          <span className='text-black-50'>
            0<span className='font-normal'>원</span>
          </span>
        </div>
        <div className='border-t border-black-200 w-full pt-4 flex justify-between'>
          <span className='text-black-200'>{`총 결제 금액 `}</span>
          <span className='text-white font-semibold'>
            {totalPrice.toLocaleString()}
            <span className='font-normal'>원</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
