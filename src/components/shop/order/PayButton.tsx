import { Dispatch, SetStateAction } from 'react';

interface PayButtonProps {
  totalPrice: number;
}

function PayButton({ totalPrice }: PayButtonProps) {
  return (
    <>
      <div className='border-2 border-white p-4 rounded-lg mt-4'>
        <div className='py-4 mb-4'>
          <span className='text-xl'>주문요약</span>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div>
            <span>{`총 결제 금액 `}</span>
            <span className='text-primary-400'>
              {totalPrice.toLocaleString()}
            </span>
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
        {`${totalPrice.toLocaleString()} 결제하기`}
      </button>
    </>
  );
}

export default PayButton;
