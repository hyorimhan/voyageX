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
      <div className='border-2 border-white rounded-lg p-4'>
        <div className='py-4 mb-4'>
          <span className='text-xl'>배송정보</span>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div>
            <p>김철수</p>
            <p>010-1234-5678</p>
            <p>
              도로명 : 서울특별시 영등포구 영등포로 183, 701호 {'(미래아파트)'}
            </p>
            <p>
              지번 : {'서울특별시 영등포구 영등포동 482-8 미래아파트 701호'}
            </p>
            <span>{'07839'}</span>
          </div>
          <div>
            <button className='bg-primary-400 rounded-lg p-2'>
              배송지 변경
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpressInfo;
