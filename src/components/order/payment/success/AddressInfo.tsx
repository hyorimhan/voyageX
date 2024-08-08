import { Address } from '@/types/userAddressType';

interface AddressInfoPropsType {
  expressAddress: Address | null;
}

function AddressInfo({ expressAddress }: AddressInfoPropsType) {
  return (
    <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
      <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
        배송 정보
      </div>
      <div className='pt-4 flex'>
        <div className='w-[104px] text-black-200'>받는 분 </div>
        {expressAddress?.recipient}
      </div>
      <div className='flex py-5'>
        <div className='w-[104px] text-black-200'>휴대전화 번호</div>
        {expressAddress?.phone}
      </div>
      <div className='flex gap-4'>
        <div className='w-[150px] text-black-200'>배송지 정보</div>
        <div>
          <div>
            도로명: {expressAddress?.address} {expressAddress?.detailAddress}
          </div>
          <div>
            지번: {expressAddress?.oldAddress} {expressAddress?.detailAddress}
          </div>
          <div>{`(${expressAddress?.postcode})`}</div>
        </div>
      </div>
    </div>
  );
}

export default AddressInfo;
