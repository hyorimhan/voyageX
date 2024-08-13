import { Address } from '@/types/userAddressType';

interface AddressInfoPropsType {
  expressAddress: Address | null;
  defaultAddress: Address;
}

function AddressInfo({ expressAddress, defaultAddress }: AddressInfoPropsType) {
  return (
    <div className='flex flex-row items-start gap-[1px]'>
      <div className='flex flex-col gap-4 text-black-200 font-medium sm:text-sm sm:w-[207px]'>
        <p>받는 분</p>
        <p>휴대전화 번호</p>
        <p>배송지 정보</p>
      </div>
      <div className='flex flex-col gap-4 text-black-50 sm:text-sm'>
        <p className='font-medium'>
          {expressAddress?.recipient ?? defaultAddress?.recipient}
        </p>
        <p>{expressAddress?.phone ?? defaultAddress?.phone}</p>
        <div className='flex flex-col gap-1'>
          <p>{`도로명 : ${expressAddress?.address ?? defaultAddress?.address} ${
            expressAddress?.detailAddress ?? defaultAddress?.detailAddress
          }`}</p>
          <p>{`지번 : ${
            expressAddress?.oldAddress ?? defaultAddress?.oldAddress
          } ${
            expressAddress?.detailAddress ?? defaultAddress?.detailAddress
          }`}</p>
          <span>{`(${
            expressAddress?.postcode ?? defaultAddress?.postcode
          })`}</span>
        </div>
      </div>
    </div>
  );
}

export default AddressInfo;
