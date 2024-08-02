'use client';

import { useEffect, useState } from 'react';

import useCustomerInfoStore from '@/zustand/store/customrInfoStore';
import { Address } from '@/types/userAddressType';
import CustomerChangeModal from './CustomerChangeModal';

interface CustomerInfo {
  addressList: Address[];
  user_email: string;
}

function CustomerInfo({ addressList, user_email }: CustomerInfo) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { customerInfo, setCustomerInfo } = useCustomerInfoStore(
    (state) => state,
  );
  const defaultAddress = addressList.find((address) => address.is_default);

  useEffect(() => {
    setCustomerInfo({
      customerName: defaultAddress?.recipient ?? '',
      customerPhone: defaultAddress?.phone ?? '',
      customerEmail: user_email,
    });
  }, []);
  console.log('customerInfo => ', customerInfo);

  return (
    <>
      <div className='border-2 border-black-300 rounded-lg p-4'>
        <div className='py-4 mb-4 border-b-2 border-black-700 flex flex-row items-start justify-between'>
          <span className='text-xl text-black-50'>주문자 정보</span>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-primary-400 rounded-lg p-2 transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
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
              <p>{customerInfo?.customerName ?? defaultAddress?.recipient}</p>
              <p>{customerInfo?.customerPhone ?? defaultAddress?.phone}</p>
              <p>{customerInfo?.customerEmail ?? user_email}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CustomerChangeModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default CustomerInfo;
