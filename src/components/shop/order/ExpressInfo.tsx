'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import AddressChangeModal from './AddressChangeModal';
import { Address } from './OrderForm';

interface ExpressInfoProps {
  expressInfo: Address;
  setExpressInfo: Dispatch<SetStateAction<Address>>;
}

function ExpressInfo({ expressInfo, setExpressInfo }: ExpressInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='border-2 border-black-300 rounded-lg p-4'>
        <div className='py-4 mb-4 border-b-2 border-black-700 flex flex-row items-center justify-between'>
          <span className='text-xl text-black-50'>배송정보</span>
          <button
            className='bg-primary-400 rounded-lg p-2'
            onClick={() => setIsModalOpen(true)}
          >
            배송지 변경
          </button>
        </div>
        <div className='flex flex-row items-start gap-8'>
          <div className='flex flex-col gap-4 text-black-200'>
            <p>받는 분</p>
            <p>휴대전화 번호</p>
            <p>배송지 정보</p>
          </div>
          <div className='flex flex-col gap-4 text-black-50'>
            <p>{expressInfo.recipient}</p>
            <p>{expressInfo.phone}</p>
            <div>
              <p>
                도로명 : {expressInfo.address + ' ' + expressInfo.detailAddress}
              </p>
              <p>
                지번 :{' '}
                {expressInfo.oldAddress + ' ' + expressInfo.detailAddress}
              </p>
              <span>({expressInfo.postcode})</span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddressChangeModal
          expressInfo={expressInfo}
          setIsModalOpen={setIsModalOpen}
          setExpressInfo={setExpressInfo}
        />
      )}
    </>
  );
}

export default ExpressInfo;
