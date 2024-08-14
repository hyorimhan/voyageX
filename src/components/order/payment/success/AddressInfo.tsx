import { Address, Customer } from '@/types/userAddressType';

interface AddressInfoPropsType {
  expressAddress: Address | null;
  customerInfo: Customer;
}

function AddressInfo({ expressAddress, customerInfo }: AddressInfoPropsType) {
  return (
    <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
      <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
        배송 정보
      </div>
      <div className='mt-4 flex'>
        <div className='w-[80px] text-black-200'>받는 분 </div>
        {customerInfo.customerName}
      </div>
      <div className='flex my-5'>
        <div className='w-[80px] text-black-200'>휴대폰 번호</div>
        {customerInfo.customerPhone}
      </div>
      <div className='flex flex-row flex-nowrap'>
        <div className='w-[80px] text-black-200'>
          <span className='w-full'>배송지 정보</span>
        </div>
        <div className='w-[216px]'>
          <div>{`(${expressAddress?.postcode})`}</div>
          <div>
            도로명: {expressAddress?.address} {expressAddress?.detailAddress}
          </div>
          <div>
            지번: {expressAddress?.oldAddress} {expressAddress?.detailAddress}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressInfo;
