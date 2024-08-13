interface CartTotalPricePropsType {
  totalPrice: number;
}

function CartTotalPriceMobile({ totalPrice }: CartTotalPricePropsType) {
  return (
    <section>
      <div className='w-full border-t-[1px] text-sm border-white grid grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] p-6 justify-center mt-4'>
        <div className='grid grid-rows-2 gap-2 w-full font-medium'>
          <span className='items-center'>총 주문금액</span>
          <span className='items-center'>총 배송비</span>
        </div>
        <div className='grid grid-rows-2 gap-2 w-full font-semibold text-base text-white'>
          <span className='items-center'>{`${totalPrice.toLocaleString()}원`}</span>
          <span className='items-center'>무료배송</span>
        </div>
      </div>
      <div className='w-full border-t-[1px] border-black-700 grid grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] p-6 justify-center'>
        <span className='text-sm self-center font-medium'>총 결제금액</span>
        <span className='text-base self-center font-semibold'>{`${totalPrice.toLocaleString()}원`}</span>
      </div>
    </section>
  );
}

export default CartTotalPriceMobile;
