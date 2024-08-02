'use client';
import CustomerChangeModal from '@/components/order/CustomerChangeModal';
import useAuthStore from '@/zustand/store/useAuth';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import { useState } from 'react';

function CustomerInfo() {
  const setUpdateInfo = useUpdateInfoStore((state) => state.setUpdateInfo);
  const user = useAuthStore((state) => state.user);
  const updateInfo = useUpdateInfoStore((state) => state.updateInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: updateInfo?.name || '주문자 정보를 입력해주세요',
    phone: updateInfo?.phone || '전화번호를 입력해주세요',
    email: user?.email || updateInfo?.email,
  });
  const updateCustomerInfo = (updateInfo: {
    name: string;
    phone: string;
    email: string;
  }) => {
    setCustomerInfo(updateInfo);
    setUpdateInfo(updateInfo);
  };
  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg  mb-8 '>
        <div className=' mb-5 flex'>
          <div className='items-center border-b border-b-black-700 flex mt-5 ml-5'>
            <div className='w-[570px] text-xl '>주문자 정보</div>
            <button
              className='bg-primary-400 rounded-lg p-2 h-[30px] text-xs mb-3'
              onClick={() => setIsModalOpen(true)}
            >
              주문자 정보 변경
            </button>
          </div>
        </div>

        <div className='mx-auto w-[672px] text-sm'>
          <div className='flex'>
            <div className='w-[104px] mr-[18px]'>받는 분</div>
            <div>{customerInfo.name}</div>
          </div>
          <div className='flex'>
            <div className='w-[104px] mr-[18px] my-5'>휴대전화 번호</div>
            <div className='my-5'>{customerInfo.phone}</div>
          </div>
          <div className='flex'>
            <div className='w-[104px] mr-[18px] mb-5'>이메일 주소</div>
            <div className='mb-5'>{customerInfo.email}</div>
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
