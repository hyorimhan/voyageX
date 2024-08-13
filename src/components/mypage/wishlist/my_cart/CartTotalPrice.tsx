import EqualIcon32px from '@/components/common/icons/32px/EqualIcon32px';
import PlusBoldIcon32px from '@/components/common/icons/32px/PlusBoldIcon32px';

interface CartTotalPricePropsType {
  totalPrice: number;
}

function CartTotalPrice({ totalPrice }: CartTotalPricePropsType) {
  return (
    <div className='border-t-[1px] border-white h-32 flex py-6 justify-center mt-1'>
      <div className='flex flex-col items-center w-[254px]'>
        <span className='mb-4 font-medium'>총 주문금액</span>
        <span className='text-lg font-semibold'>{`${totalPrice.toLocaleString()}원`}</span>
      </div>
      <div className='self-center'>
        <span className='text-lg'>
          <PlusBoldIcon32px />
        </span>
      </div>
      <div className='flex flex-col items-center w-[254px]'>
        <span className='mb-4 font-medium'>총 배송비</span>
        <span className='text-lg font-semibold'>무료 배송</span>
      </div>
      <div className='self-center'>
        <span className='text-lg'>
          <EqualIcon32px />
        </span>
      </div>
      <div className='flex flex-col items-center w-[254px]'>
        <span className='mb-4 font-medium'>총 결제금액</span>
        <span className='text-lg font-semibold'>{`${totalPrice.toLocaleString()}원`}</span>
      </div>
    </div>
  );
}

export default CartTotalPrice;
