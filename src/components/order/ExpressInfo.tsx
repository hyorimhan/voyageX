'use client';

import { useState } from 'react';

import AddressChangeModal from './AddressChangeModal';

function ExpressInfo() {
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
            <p>세종대왕</p>
            <p>010-1234-5678</p>
            <div>
              <p>도로명 : 서울 종로구 효자로 12 국립고궁박물관</p>
              <p>지번 : 세종로 1-57</p>
              <span>12345</span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddressChangeModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default ExpressInfo;
