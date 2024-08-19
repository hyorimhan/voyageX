'use client';

import { phoneValidate } from '@/utils/tourValidation';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import CloseWhiteIcon24px from '../common/icons/24px/CloseWhiteIcon24px';

interface CustomerChangeModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  updateCustomerInfo: (updateInfo: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }) => void;
}

function CustomerChangeModal({
  isModalOpen,
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.documentElement.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section
      ref={modalBackground}
      className='flex w-full h-full fixed top-0 left-0 justify-center items-center bg-black-1000 bg-opacity-50 z-30'
      onClick={(e) => {
        if (e.target === modalBackground.current) setIsModalOpen(false);
      }}
    >
      <div className='relative bg-black-800 w-[432px] h-[484px] rounded-lg p-8'>
        <div className='flex justify-end'>
          <button type='button' onClick={() => setIsModalOpen(false)}>
            <CloseWhiteIcon24px />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeCustomerInfo();
          }}
        >
          <div className='flex flex-col items-center gap-8'>
            {!customerInfo?.customerName || !customerInfo?.customerPhone
              ? '주문자정보 입력'
              : '주문자정보 변경'}
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex flex-col'>
                <label htmlFor='customerName' className='text-black-200'>
                  이름
                </label>
                <input
                  id='customerName'
                  type='text'
                  placeholder=' 이름을 입력해주세요.'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='rounded h-12 w-full text-black-1000 p-4'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='customerPhone' className='text-black-200'>
                  휴대폰 번호
                </label>
                <input
                  id='customerPhone'
                  type='tel'
                  placeholder='-를 제외하고 입력해주세요.'
                  value={phone}
                  onChange={onChangePhone}
                  className='rounded h-12 w-full text-black-1000 p-4'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='customerEmail' className='text-black-200'>
                  이메일
                </label>
                <input
                  id='customerEmail'
                  type='email'
                  placeholder=' 예) voyageX@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='rounded h-12 w-full text-black-1000 p-4'
                />
              </div>
            </div>
            <button
              type='submit'
              className='bg-primary-600 py-4 rounded-lg w-full transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500'
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CustomerChangeModal;
