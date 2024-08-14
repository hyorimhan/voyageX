'use client';

import { useEffect, useState } from 'react';
import { Address } from '@/types/userAddressType';
import CustomerChangeModal from './CustomerChangeModal';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import CustomerChangeSheet from './CustomerChangeSheet';

interface CustomerInfo {
  addressList: Address[];
  user_email: string;
  isTour: boolean;
}

function CustomerInfo({ addressList, user_email, isTour }: CustomerInfo) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { customerInfo, setCustomerInfo } = useCustomerInfoStore(
    (state) => state,
  );
  const { updateInfo, setUpdateInfo } = useUpdateInfoStore((state) => state);
  const { expressAddress } = useExpressInfoStore((state) => state);
  const defaultAddress = addressList.find((address) => address.is_default);

  const updateCustomerInfo = (updateInfo: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }) => {
    setUpdateInfo(updateInfo);
    setCustomerInfo(updateInfo);
  };

  useEffect(() => {
    if (isTour) {
      setCustomerInfo({
        customerName: updateInfo?.customerName ?? '',
        customerPhone: updateInfo?.customerPhone ?? '',
        customerEmail: updateInfo?.customerEmail ?? user_email,
      });
    } else {
      setCustomerInfo({
        customerName:
          updateInfo?.customerName ??
          expressAddress?.recipient ??
          defaultAddress?.recipient ??
          '',
        customerPhone:
          updateInfo?.customerPhone ??
          expressAddress?.phone ??
          defaultAddress?.phone ??
          '',
        customerEmail: updateInfo?.customerEmail ?? user_email,
      });
    }
  }, [
    defaultAddress?.phone,
    defaultAddress?.recipient,
    expressAddress?.phone,
    expressAddress?.recipient,
    isTour,
    setCustomerInfo,
    updateInfo?.customerEmail,
    updateInfo?.customerName,
    updateInfo?.customerPhone,
    user_email,
  ]);

  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg sm:p-4 md:pt-4 md:px-5 md:pb-5 lg:pt-4 lg:px-5 lg:pb-5'>
        <div className='pt-1 pb-3 mb-4 border-b border-black-700 flex flex-row items-start justify-between'>
          <span className='text-xl text-black-50 font-medium'>주문자 정보</span>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-primary-400 rounded px-3 py-2 flex items-center justify-center w-[113px] h-[33px] text-sm transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
            >
              {!customerInfo?.customerName || !customerInfo?.customerPhone
                ? '주문자정보 입력'
                : '주문자정보 변경'}
            </button>
          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-end sm:gap-2 md:gap-8 lg:gap-8 mb-1'>
            <div className='flex flex-col gap-5 text-black-200 font-medium sm:text-sm sm:w-[70px]'>
              <p>받는 분</p>
              <p>휴대폰 번호</p>
              <p>이메일 주소</p>
            </div>
            <div className='flex flex-col gap-5 text-black-50 sm:text-sm'>
              <p>
                {(customerInfo?.customerName ?? defaultAddress?.recipient) ||
                  '이름을 입력해주세요'}
              </p>
              <p>
                {(customerInfo?.customerPhone ?? defaultAddress?.phone) ||
                  '휴대전화 번호를 입력해주세요.'}
              </p>
              <p>
                {(customerInfo?.customerEmail ?? user_email) ||
                  '이메일 주소를 입력해주세요.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className='sm:hidden'>
            <CustomerChangeModal
              setIsModalOpen={setIsModalOpen}
              updateCustomerInfo={updateCustomerInfo}
            />
          </div>
          <div className='md:hidden lg:hidden'>
            <CustomerChangeSheet
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              updateCustomerInfo={updateCustomerInfo}
            />
          </div>
        </>
      )}
    </>
  );
}

export default CustomerInfo;
