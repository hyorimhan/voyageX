interface CartTotalPricePropsType {
  totalPrice: number;
}

function CartTotalPrice({ totalPrice }: CartTotalPricePropsType) {
  return (
    <div className='border-t border-white my-4'>
      <div className='flex flex-row justify-evenly p-4'>
        <div className='flex flex-col items-center'>
          <span className='text-base'>총 주문금액</span>
          <span className='text-lg'>{`${totalPrice.toLocaleString()}원`}</span>
        </div>
        <div className='self-center'>
          <span className='text-lg'>+</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-base'>총 배송비</span>
          <span className='text-lg'>0원</span>
        </div>
        <div className='self-center'>
          <span className='text-lg'>=</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-base'>총 결제금액</span>
          <span className='text-lg'>{`${totalPrice.toLocaleString()}원`}</span>
        </div>
      </div>
    </div>
  );
}

export default CartTotalPrice;
