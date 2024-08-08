'use client';

import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface CustomerChangeModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  updateCustomerInfo: (updateInfo: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }) => void;
}

function CustomerChangeModal({
  setIsModalOpen,
  updateCustomerInfo,
}: CustomerChangeModalProps) {
  const { customerInfo, setCustomerInfo } = useCustomerInfoStore(
    (state) => state,
  );
  const modalBackground = useRef(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(customerInfo?.customerName ?? '');
    setPhone(customerInfo?.customerPhone ?? '');
    setEmail(customerInfo?.customerEmail ?? '');
  }, [
    customerInfo?.customerName,
    customerInfo?.customerPhone,
    customerInfo?.customerEmail,
  ]);

  const handleChangeCustomerInfo = () => {
    if (!name.trim()) return toast.error('성함을 입력해주세요!');
    if (!phone.trim()) return toast.error('휴대전화 번호를 입력해주세요!');
    if (!email.trim()) return toast.error('이메일 주소를 입력해주세요!');
    updateCustomerInfo({
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
    });
    toast.success('주문자 정보가 변경되었습니다!');
    setIsModalOpen(false);
  };

  return (
    <section
      ref={modalBackground}
      className='flex w-full h-full fixed top-0 left-0 justify-center bg-black-1000 bg-opacity-50 z-30'
      onClick={(e) => {
        if (e.target === modalBackground.current) setIsModalOpen(false);
      }}
    >
      <div className='relative bg-black-800 w-1/3 h-[700px] my-24 mx-auto rounded-lg'>
        <div className='flex justify-end'>
          <button
            className='mr-10 mt-4 text-3xl bg-transparent'
            type='button'
            onClick={() => setIsModalOpen(false)}
          >
            X
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeCustomerInfo();
          }}
        >
          <div className='flex flex-col items-center'>
            <div className='flex flex-row justify-center w-full p-2'>
              <p className='text-xl'>주문자 정보</p>
            </div>
            <div className='flex flex-col w-2/4 gap-4'>
              <label htmlFor='customerName'>이름*</label>
              <input
                id='customerName'
                type='text'
                placeholder=' 성함'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='rounded h-16 text-black-1000 p-1'
              />
              <label htmlFor='customerPhone'>휴대폰 번호*</label>
              <input
                id='customerPhone'
                type='tel'
                placeholder=' 휴대폰 번호'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='rounded h-16 text-black-1000 p-1'
              />
              <label htmlFor='customerEmail'>이메일*</label>
              <input
                id='customerEmail'
                type='email'
                placeholder=' 이메일'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='rounded h-16 text-black-1000 p-1'
              />
            </div>
            <button
              type='submit'
              className='bg-primary-600 p-4 mt-16 w-1/2 rounded-lg transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500'
            >
              주문자 정보 변경
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CustomerChangeModal;
