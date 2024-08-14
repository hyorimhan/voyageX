import { Address } from '@/types/userAddressType';

interface AddressInfoPropsType {
  expressAddress: Address | null;
  defaultAddress: Address;
}

function AddressInfo({ expressAddress, defaultAddress }: AddressInfoPropsType) {
  return (
    <div className='flex flex-row items-start gap-8 sm:gap-2'>
      <div className='flex flex-col gap-5 text-black-200 font-medium sm:text-sm sm:w-[110px]'>
        <p>받는 분</p>
        <p>휴대폰 번호</p>
        <p>배송지 정보</p>
      </div>
      <div className='flex flex-col gap-5 text-black-50 sm:text-sm'>
        <p className='font-medium'>
          {expressAddress?.recipient ?? defaultAddress?.recipient}
        </p>
        <p>{expressAddress?.phone ?? defaultAddress?.phone}</p>
        <div className='flex flex-col gap-1'>
          <span>{`(${
            expressAddress?.postcode ?? defaultAddress?.postcode
          })`}</span>
          <p>{`도로명 : ${expressAddress?.address ?? defaultAddress?.address} ${
            expressAddress?.detailAddress ?? defaultAddress?.detailAddress
          }`}</p>
          <p>{`지번 : ${
            expressAddress?.oldAddress ?? defaultAddress?.oldAddress
          } ${
            expressAddress?.detailAddress ?? defaultAddress?.detailAddress
          }`}</p>
        </div>
      </div>
    </div>
  );
}

export default AddressInfo;
