interface PayButtonProps {
  totalPrice: number;
}

function PayButton() {
  return (
    <>
      <div className='border-2 border-white p-4 rounded-lg mt-4'>
        <div className='py-4 mb-4'>
          <span className='text-xl'>주문요약</span>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <p>{`총 주문 금액 60,200`}</p>
          <p className='border-b-2 border-white w-full pb-4'>{`총 배송비 3,000`}</p>
          <div>
            <span>{`총 결제 금액 `}</span>
            <span className='text-primary-400'>63,200</span>
          </div>
        </div>
      </div>
      <div className='border-2 border-white p-4 rounded-lg mt-4 flex flex-col items-start'>
        <p className='text-xl'>주문동의</p>
        <div className='flex flex-row items-center justify-center gap-1'>
          <div className='p-4 border-2 border-white w-1 mt-4'></div>
          <p className='text-xs self-center'>
            {'[필수] 주문 내역에 대한 필수 동의'}
          </p>
        </div>
      </div>
      <button className='bg-[#4D367C] rounded-md p-4 w-full mt-4 text-lg'>
        {`63,200 결제하기`}
      </button>
    </>
  );
}

export default PayButton;
