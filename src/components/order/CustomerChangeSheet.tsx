'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { phoneValidate } from '@/utils/tourValidation';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import toast from 'react-hot-toast';
import CloseWhiteIcon24px from '../common/icons/24px/CloseWhiteIcon24px';

interface CustomerChangeSheetProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  updateCustomerInfo: (updateInfo: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }) => void;
}

const modalVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '100%',
  },
};

const modalTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 50,
  duration: 0.4,
};

function CustomerChangeSheet({
  isModalOpen,
  setIsModalOpen,
  updateCustomerInfo,
}: CustomerChangeSheetProps) {
  const { customerInfo } = useCustomerInfoStore((state) => state);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(customerInfo?.customerName ?? '');
    setPhone(customerInfo?.customerPhone ?? '');
    setEmail(customerInfo?.customerEmail ?? '');
  }, [customerInfo]);

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = phoneValidate(e);
    setPhone(formattedValue);
  };

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
    <AnimatePresence>
      <motion.section
        className='fixed inset-0 flex items-end justify-center bg-black-1000 bg-opacity-75 z-30'
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
      >
        <motion.div
          className='bg-black-800 w-full rounded-t-lg p-8 transform'
          variants={modalVariants}
          transition={modalTransition}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
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
            <div className='flex flex-col items-center gap-8 w-full'>
              <div>
                {!customerInfo?.customerName || !customerInfo?.customerPhone
                  ? '주문자정보 입력'
                  : '주문자정보 변경'}
              </div>
              <div className='flex flex-col w-full gap-4'>
                <div className='flex flex-col'>
                  <label htmlFor='customerName' className='text-black-200'>
                    주문자
                  </label>
                  <input
                    id='customerName'
                    type='text'
                    placeholder='이름을 입력해주세요.'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='rounded h-12 text-black-1000 p-4'
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
                    className='rounded h-12 text-black-1000 p-4'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='customerEmail' className='text-black-200'>
                    이메일
                  </label>
                  <input
                    id='customerEmail'
                    type='email'
                    placeholder='예) voyageX@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='rounded h-12 text-black-1000 p-4'
                  />
                </div>
              </div>
              <button
                type='submit'
                className='bg-primary-600 text-base font-semibold py-4 w-full rounded-lg transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500 text-white'
              >
                저장하기
              </button>
            </div>
          </form>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}

export default CustomerChangeSheet;
