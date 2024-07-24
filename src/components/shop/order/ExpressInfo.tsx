'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { AddressType } from './OrderForm';

interface ExpressInfoProps {
  setExpressInfo: Dispatch<SetStateAction<AddressType>>;
}

function ExpressInfo({ setExpressInfo }: ExpressInfoProps) {
  const addresses = [
    {
      id: '1',
      user_id: 'gusdnr',
      contact: '010-1234-1234',
      address: '무슨시 무슨구',
      address_name: '집',
      email: 'abc123@abc.com',
    },
    {
      id: '2',
      user_id: 'ddddd',
      contact: '010-5678-1234',
      address: '어떤시 어딴구',
      address_name: '회사',
      email: 'qwe123@abc.com',
    },
    {
      id: '3',
      user_id: 'tlqkf',
      contact: '010-1234-9101',
      address: '십ㅏㄹ시 십ㅏㄹ구',
      address_name: '학교',
      email: 'asdf123@abc.com',
    },
  ];

  const handleChangeAddress = (address: AddressType) => {
    setExpressInfo(address);
  };

  return (
    <>
      <div>
        <div className='flex justify-end'>
          <button type='button' className='bg-[#4D367C]'>
            기본배송지 설정
          </button>
        </div>
        <div className='border-b-2 border-white'>
          <span className='text-xl'>배송정보</span>
        </div>
        <div className='grid grid-flow-col grid-cols-4 border-b-2 border-white py-2'>
          <span className='mx-auto'>주소별칭</span>
          <span className='mx-auto'>배송주소</span>
          <span className='mx-auto'>받으실분/연락처</span>
          <span className='mx-auto'>관리</span>
        </div>
        {addresses.map((address) => (
          <div
            key={address.id}
            className='flex flex-row w-full items-center border-b-2 border-white'
          >
            <div>
              <input
                type='checkbox'
                onChange={() => handleChangeAddress(address)}
              />
            </div>
            <div className='grid grid-cols-4 py-4 w-full'>
              <p className='mx-auto self-center'>{address.address_name}</p>
              <div className='mx-auto self-center'>
                <p>{address.address}</p>
              </div>
              <div className='mx-auto'>
                <div className='flex flex-col items-center'>
                  <p>{address.user_id}</p>
                  <p>{address.contact}</p>
                </div>
              </div>
              <button
                type='button'
                className='mx-auto border-2 border-[#4D367C] rounded text-sm self-center p-1'
              >
                수정
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExpressInfo;
