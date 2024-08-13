interface CartTotalPricePropsType {
  totalPrice: number;
}

function CartTotalPriceMobile({ totalPrice }: CartTotalPricePropsType) {
  return (
    <section>
      <div className='w-full border-t-[1px] text-sm border-white grid grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] p-6 justify-center mt-4'>
        <div className='flex flex-col items-start gap-2 w-full'>
          <span>총 주문금액</span>
          <span>총 배송비</span>
        </div>
        <div className='flex flex-col items-start gap-2 w-full text-base text-white'>
          <span>{`${totalPrice.toLocaleString()}원`}</span>
          <span>무료배송</span>
        </div>
      </div>
      <div className='w-full border-t-[1px] border-black-700 grid grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] p-6 justify-center'>
        <span className='text-sm self-center'>총 결제금액</span>
        <span className='text-base self-center'>{`${totalPrice.toLocaleString()}원`}</span>
      </div>
    </section>
  );
}

export default CartTotalPriceMobile;
