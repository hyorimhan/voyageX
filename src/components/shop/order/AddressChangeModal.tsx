import { Address } from './OrderForm';
import { Dispatch, SetStateAction } from 'react';

interface AddressChangeModal {
  setExpressInfo: Dispatch<SetStateAction<Address>>;
}

function AddressChangeModal({ setExpressInfo }: AddressChangeModal) {
  const addresses: Address[] = [
    {
      alias: '집',
      postcode: '52453',
      address: '경남 남해군 창선면 창선로94번길 11-2 (상죽리)',
      oldAddress: '경남 남해군 창선면 상죽리 80',
      detailAddress: '초록색대문',
      recipient: 'gusdnr',
      phone: '01012341234',
    },
    {
      alias: '광화문',
      postcode: '03045',
      address: '서울 종로구 효자로 12 국립고궁박물관',
      oldAddress: '세종로 1-57',
      detailAddress: '',
      recipient: '세종대왕',
      phone: '01056789101',
    },
  ];

  const handleSelectAddress = (address: Address) => {
    setExpressInfo(address);
  };

  return (
    <>
      <div className='flex gap-10 w-full text-center text-lg mt-3'>
        <p className='ml-24'>주소별칭</p>
        <p className='w-80 ml-6'>배송주소</p>
        <p className='w-36 ml-8'>받으실분/연락처</p>
        <p>관리</p>
      </div>
      <div className='border-b-2 border-solid border-white mt-3'></div>
      {addresses.map((address, index) => (
        <div key={index}>
          <div className='flex w-full text-center py-7 items-center'>
            <div className='ml-7 mr-7 w-8 h-8'>
              <div
                onClick={() => handleSelectAddress(address)}
                className='text-3xl w-full h-full rounded-full border-2 border-white cursor-pointer'
              ></div>
            </div>
            <p className='text-lg w-28 text-center'>{address.alias}</p>
            <div className='text-left text-xs w-80 ml-16'>
              <p>({address.postcode})</p>
              <p>
                도로명 : {address.address} {address.detailAddress}
              </p>
              <p>
                지번 : {address.oldAddress} {address.detailAddress}
              </p>
            </div>
            <div className='text-base ml-20'>
              <p className='mb-3'>{address.recipient}</p>
              <p className='text-xs'>{address.phone}</p>
            </div>
            <div className='gap-3 flex justify-center ml-10 text-xs'>
              <button className='bg-slate-500 p-1 rounded-sm'>수정</button>
              <button className='bg-slate-500 p-1 rounded-sm'>삭제</button>
            </div>
          </div>
          <div className='border-b-2 border-solid border-white mt-3'></div>
        </div>
      ))}
    </>
  );
}

export default AddressChangeModal;
