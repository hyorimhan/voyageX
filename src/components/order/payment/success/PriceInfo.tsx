interface PriceInfoPropsType {
  amount: number;
}

function PriceInfo({ amount }: PriceInfoPropsType) {
  return (
    <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
      <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
        결제 정보
      </div>
      <div className='pt-4 flex'>
        <div className='w-[104px]'>총 주문 금액 </div>
        {amount.toLocaleString()}원
      </div>
      <div className='flex py-5 w-full border-b-black-700 border-b-[1px]'>
        <div className='w-[104px]'>총 배송비</div>
        무료
      </div>
      <div className='flex pt-5'>
        <div className='w-[104px]'>총 결제 금액 </div>
        {amount.toLocaleString()}원
      </div>
    </div>
  );
}

export default PriceInfo;
