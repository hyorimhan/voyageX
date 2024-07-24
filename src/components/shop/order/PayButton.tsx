interface PayButtonProps {
  totalPrice: number;
}

function PayButton({ totalPrice }: PayButtonProps) {
  return (
    <>
      <div className='bg-[#333333] sticky bottom-0 h-24 flex flex-row items-center justify-between p-4'>
        <div>{`총 주문 금액: ${totalPrice.toLocaleString()}원`}</div>
        <button className='bg-[#4D367C] rounded-md p-4'>결제하기</button>
      </div>
    </>
  );
}

export default PayButton;
