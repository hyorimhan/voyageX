'use client';

import { phoneValidate } from '@/utils/tourValidation';
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

function CustomerChangeSheet({
  setIsModalOpen,
  updateCustomerInfo,
}: CustomerChangeModalProps) {
  const { customerInfo } = useCustomerInfoStore((state) => state);
  const modalBackground = useRef(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = phoneValidate(e);
    setPhone(formattedValue);
  };

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
    if (phone.length < 13) return toast.error('전화번호를 끝까지 입력해주세요');
    if (name.length > 10)
      return toast.error('이름은 10자 이상 입력할 수 없습니다');
    updateCustomerInfo({
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
    });
    toast.success('주문자 정보가 입력되었습니다!');
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
      <div className='fixed bottom-0 bg-black-800 w-full rounded-t-lg p-8'>
        <div className='flex justify-end'>
          <button
            className='mr-11 mt-4 text-3xl bg-transparent sm:mr-4 sm:mt-1'
            type='button'
            onClick={() => setIsModalOpen(false)}
          >
            x
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeCustomerInfo();
          }}
        >
          <div className='flex flex-col items-center gap-8 w-full'>
            <div className=''>
              <p className='text-xl'>주문자정보 변경</p>
            </div>
            <div className='flex flex-col sm:w-full w-2/3 sm:mx-2 gap-4'>
              <label htmlFor='customerName'>이름</label>
              <input
                id='customerName'
                type='text'
                placeholder=' 이름을 입력해주세요.'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='rounded h-16 sm:h-12 text-black-1000 p-1'
              />
              <label htmlFor='customerPhone'>휴대폰 번호</label>
              <input
                id='customerPhone'
                type='tel'
                placeholder='010-1234-5678'
                value={phone}
                onChange={onChangePhone}
                className='rounded h-16 sm:h-12 text-black-1000 p-1'
              />
              <label htmlFor='customerEmail'>이메일</label>
              <input
                id='customerEmail'
                type='email'
                placeholder=' 예) voyageX@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='rounded h-16 sm:h-12 sm:w-full  text-black-1000 p-1'
              />
            </div>
            <button
              type='submit'
              className='bg-primary-600 p-4 sm:mt-10 mt-16 w-2/3 sm:w-full  rounded-lg transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500'
            >
              주문자 정보 변경
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CustomerChangeSheet;
