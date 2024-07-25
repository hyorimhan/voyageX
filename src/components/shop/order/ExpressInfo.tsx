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
      <div className='border-2 border-white rounded-lg p-4'>
        <div className='py-4 mb-4'>
          <span className='text-xl'>배송정보</span>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div>
            <p>{expressInfo.recipient}</p>
            <p>{expressInfo.phone}</p>
            <p>
              도로명 : {expressInfo.address + ' ' + expressInfo.detailAddress}
            </p>
            <p>
              지번 : {expressInfo.oldAddress + ' ' + expressInfo.detailAddress}
            </p>
            <span>{expressInfo.postcode}</span>
          </div>
          <div>
            <button
              className='bg-primary-400 rounded-lg p-2'
              onClick={() => setIsModalOpen(true)}
            >
              배송지 변경
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <AddressChangeModal setExpressInfo={setExpressInfo} />}
    </>
  );
}

export default ExpressInfo;
