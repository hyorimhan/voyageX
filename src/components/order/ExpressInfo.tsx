'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddressChangeModal from './AddressChangeModal';
import { Tables } from '@/types/supabase';
import useExpressInfoStore from '@/zustand/store/expressInfoStore';
import useAuthStore from '@/zustand/store/useAuth';
import { getAddressList } from '@/services/address';
import { useQuery } from '@tanstack/react-query';

interface ExpressInfoPropsType {
  currentAddress: Tables<'addresses'> | null;
  setCurrentAddress: Dispatch<SetStateAction<Tables<'addresses'> | null>>;
}

function ExpressInfo({
  currentAddress,
  setCurrentAddress,
}: ExpressInfoPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setExpressAddress } = useExpressInfoStore((state) => state);
  useEffect(() => {
    setExpressAddress(currentAddress);
  }, [currentAddress]);
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
            <p>{currentAddress?.recipient}</p>
            <p>{currentAddress?.phone}</p>
            <div>
              <p>{`도로명 : ${currentAddress?.address} ${currentAddress?.detailAddress}`}</p>
              <p>{`지번 : ${currentAddress?.oldAddress} ${currentAddress?.detailAddress}`}</p>
              <span>{currentAddress?.postcode}</span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddressChangeModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default ExpressInfo;
