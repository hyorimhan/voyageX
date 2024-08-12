interface OrderSummaryPropsType {
  totalPrice: number;
}

function OrderSummary({ totalPrice }: OrderSummaryPropsType) {
  return (
    <div className='border-[1px] border-black-300 p-4 rounded-lg lg:mt-4 mb-8'>
      <div className='py-2 mb-4 border-b border-black-700'>
        <span className='text-xl'>주문요약</span>
      </div>
      <div className='flex flex-col items-start gap-4'>
        <div className='w-full flex justify-between'>
          <span className='text-black-200'>총 주문 금액</span>
          <span className='text-black-50'>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className='w-full flex justify-between'>
          <span className='text-black-200'>총 배송비</span>
          <span className='text-black-50'>0원</span>
        </div>
        <div className='border-t border-black-200 w-full pt-4 flex justify-between pb-[10px]'>
          <span className='text-black-200'>{`총 결제 금액 `}</span>
          <span className='text-primary-400'>
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
