'use client';

import { useEffect, useState } from 'react';
import { Address } from '@/types/userAddressType';
import CustomerChangeModal from './CustomerChangeModal';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';

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
      <div className='border-[1px] border-black-300 rounded-lg p-4 mb-8'>
        <div className='py-4 mb-4 border-b border-black-700 flex flex-row items-start justify-between'>
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
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-end gap-8'>
            <div className='flex flex-col gap-4 text-black-200'>
              <p>받는 분</p>
              <p>휴대전화 번호</p>
              <p>이메일 주소</p>
            </div>
            <div className='flex flex-col gap-4 text-black-50'>
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
        <CustomerChangeModal
          setIsModalOpen={setIsModalOpen}
          updateCustomerInfo={updateCustomerInfo}
        />
      )}
    </>
  );
}

export default CustomerInfo;
