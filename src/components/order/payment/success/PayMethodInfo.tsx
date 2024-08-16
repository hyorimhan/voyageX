interface PayMethodInfoPropsType {
  result: any;
}

function PayMethodInfo({ result }: PayMethodInfoPropsType) {
  return (
    <div className='border-black-300 border-[1px] rounded-lg p-5 flex-1 min-w-[300px]'>
      <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
        결제 수단
      </div>
      <div className='text-sm'>
        <div className='mt-4 flex gap-4'>
          <div className='w-[80px] text-black-200'>결제 방법</div>
          {result.easyPay
            ? `${result.easyPay.provider} ${result.method}`
            : result.method}
        </div>
        <div className='py-5 flex gap-4'>
          <div className='w-[80px] text-black-200'>분할 납부</div>
          {result.card &&
            `${
              result.card.installmentPlanMonths
                ? `${result.card.installmentPlanMonths}개월 할부`
                : '일시불'
            }`}
        </div>
        <div className='flex gap-4'>
          <div className='w-[80px] text-black-200'> 결제 일시 </div>
          {result.approvedAt.slice(0, 10)}
        </div>
        <div className='pt-5 flex gap-4'>
          <div className='w-[80px] text-black-200'>주문 상태</div> 결제완료
        </div>
      </div>
    </div>
  );
}

export default PayMethodInfo;
