'use client';

import { useState } from 'react';
import AddressChangeModal from './AddressChangeModal';
import { Tables } from '@/types/supabase';
import useExpressInfoStore from '@/zustand/store/expressInfoStore';

interface ExpressInfoPropsType {
  addressList: Tables<'addresses'>[];
}

function ExpressInfo({ addressList }: ExpressInfoPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expressAddress, setExpressAddress } = useExpressInfoStore(
    (state) => state,
  );
  const defaultAddress = addressList.find((address) => address.is_default);

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
            <p>{expressAddress?.recipient ?? defaultAddress?.recipient}</p>
            <p>{expressAddress?.phone ?? defaultAddress?.phone}</p>
            <div>
              <p>{`도로명 : ${
                expressAddress?.address ?? defaultAddress?.address
              } ${
                expressAddress?.detailAddress ?? defaultAddress?.detailAddress
              }`}</p>
              <p>{`지번 : ${
                expressAddress?.oldAddress ?? defaultAddress?.oldAddress
              } ${
                expressAddress?.detailAddress ?? defaultAddress?.detailAddress
              }`}</p>
              <span>
                {expressAddress?.postcode ?? defaultAddress?.postcode}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddressChangeModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default ExpressInfo;
