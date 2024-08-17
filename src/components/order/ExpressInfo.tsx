'use client';

import { useEffect, useState } from 'react';
import AddressChangeModal from './AddressChangeModal';
import { Address } from '@/types/userAddressType';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import AddressInfo from './AddressInfo';
import { useRouter } from 'next/navigation';

interface ExpressInfoPropsType {
  addressList: Address[];
}

function ExpressInfo({ addressList }: ExpressInfoPropsType) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expressAddress, setExpressAddress } = useExpressInfoStore(
    (state) => state,
  );
  const defaultAddress = addressList.find((address) => address.is_default);

  useEffect(() => {
    setExpressAddress(defaultAddress ?? null);
  }, [setExpressAddress, defaultAddress]);

  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg sm:p-4 md:pt-4 md:px-5 md:pb-5 lg:pt-4 lg:px-5 lg:pb-5'>
        <div className='pt-1 pb-3 mb-4 border-b border-black-700 flex flex-row items-start justify-between'>
          <span className='text-xl text-black-50 font-medium'>배송정보</span>
          <div>
            <button
              className='sm:hidden bg-primary-400 rounded flex  items-center justify-center px-3 py-2 w-[89px] h-[33px] text-sm transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
              onClick={() => setIsModalOpen(true)}
            >
              {defaultAddress ? '배송지 변경' : '배송지 입력'}
            </button>
            <button
              className='md:hidden lg:hidden bg-primary-400 rounded flex  items-center justify-center px-3 py-2 w-[89px] h-[33px] text-sm transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
              onClick={() => router.push(`/mypage/address_list`)}
            >
              {defaultAddress ? '배송지 변경' : '배송지 입력'}
            </button>
          </div>
        </div>
        {defaultAddress ? (
          <AddressInfo
            expressAddress={expressAddress}
            defaultAddress={defaultAddress}
          />
        ) : (
          <div className='font-semibold'>기본 배송지를 설정해주세요</div>
        )}
      </div>
      {isModalOpen && (
        <AddressChangeModal
          addressList={addressList}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default ExpressInfo;
