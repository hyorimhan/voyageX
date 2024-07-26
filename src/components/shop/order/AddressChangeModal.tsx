'use client';

import { Address } from './OrderForm';
import { Dispatch, SetStateAction, useState } from 'react';

interface AddressChangeModalProps {
  expressInfo: Address;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setExpressInfo: Dispatch<SetStateAction<Address>>;
}

function AddressChangeModal({
  expressInfo,
  setIsModalOpen,
  setExpressInfo,
}: AddressChangeModalProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address>(expressInfo);
  const [isActive, setIsActive] = useState<string>(expressInfo.address);
  const addresses: Address[] = [
    {
      alias: '집',
      postcode: '52453',
      address: '경남 남해군 창선면 창선로94번길 11-2 (상죽리)',
      oldAddress: '경남 남해군 창선면 상죽리 80',
      detailAddress: '초록색대문',
      recipient: 'gusdnr',
      phone: '010-1234-1234',
    },
    {
      alias: '광화문',
      postcode: '03045',
      address: '서울 종로구 효자로 12 국립고궁박물관',
      oldAddress: '세종로 1-57',
      detailAddress: '',
      recipient: '세종대왕',
      phone: '010-5678-9101',
    },
  ];

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsActive(address.address);
  };

  const handleChangeAddress = () => {
    setExpressInfo(selectedAddress);
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        className={`flex w-full h-full fixed top-0 left-0 justify-center`}
      >
        <div className='relative bg-black-800 w-3/4 h-[700px] my-24 mx-auto rounded-lg'>
          <div className='flex justify-end'>
            <button
              className='mr-10 mt-4 text-3xl bg-transparent'
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex flex-row justify-between w-full p-8'>
              <p className='text-xl'>배송지관리</p>
              <div className='flex flex-row gap-2'>
                <button className='bg-primary-600 text-xs rounded p-1'>
                  새 배송지 추가
                </button>
                <button className='bg-primary-600 text-xs rounded p-1'>
                  기본배송지 설정
                </button>
              </div>
            </div>
            <div className='flex gap-10 text-center text-base mt-3 w-3/4'>
              <p className='ml-24'>주소별칭</p>
              <p className='w-80 ml-6'>배송주소</p>
              <p className='w-36 ml-8'>받으실분/연락처</p>
              <p>관리</p>
            </div>
            <div className='mt-3 w-3/4'>
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className={`border-white border-t-2 ${
                    index === addresses.length - 1 ? 'border-y-2' : ''
                  }`}
                >
                  <div className='flex w-full text-center py-7 items-center'>
                    <div className='ml-7 mr-7 w-8 h-8'>
                      <div
                        onClick={() => handleSelectAddress(address)}
                        className={`text-3xl w-full h-full rounded-full border-2 border-white cursor-pointer
                  ${
                    isActive === address.address ? 'bg-white' : 'bg-transparent'
                  }`}
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
                      <button className='bg-slate-500 p-1 rounded-sm'>
                        수정
                      </button>
                      <button className='bg-slate-500 p-1 rounded-sm'>
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleChangeAddress}
              className='bg-primary-600 p-4 mt-20 w-1/2 rounded-lg'
            >
              배송지 변경
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddressChangeModal;
