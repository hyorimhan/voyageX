'use client';

import { useState } from 'react';
import CustomerChangeModal from './CustomerChangeModal';

function CustomerInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='border-2 border-black-300 rounded-lg p-4'>
        <div className='py-4 mb-4 border-b-2 border-black-700 flex flex-row items-start justify-between'>
          <span className='text-xl text-black-50'>주문자 정보</span>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-primary-400 rounded-lg p-2'
            >
              주문자정보 변경
            </button>
          </div>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div className='flex flex-row items-center gap-8'>
            <div className='flex flex-col gap-4 text-black-200'>
              <p>받는 분</p>
              <p>휴대전화 번호</p>
              <p>이메일 주소</p>
            </div>
            <div className='flex flex-col gap-4 text-black-50'>
              <p>세종대왕</p>
              <p>010-1234-5678</p>
              <p>gusdnr@test.com</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CustomerChangeModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default CustomerInfo;
