import useAuthStore from '@/zustand/store/useAuth';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface CustomerChangeModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  updateCustomerInfo: (info: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }) => void;
}

function CustomerChangeModal({
  setIsModalOpen,
  updateCustomerInfo,
}: CustomerChangeModalProps) {
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email!);

  const handleChangeCustomerInfo = () => {
    updateCustomerInfo({
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        className={`flex w-full h-full fixed top-0 left-0 justify-center`}
      >
        <div className='relative bg-black-800 w-3/5 h-[700px] my-24 mx-auto rounded-lg'>
          <div className='flex justify-end'>
            <button
              className='mr-10 mt-4 text-3xl bg-transparent'
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
            <div className='flex flex-col items-center'>
              <div className='flex flex-row justify-center w-full p-4'>
                <p className='text-xl'>주문자 정보</p>
              </div>
              <div className='flex flex-col w-1/2 gap-4'>
                <label htmlFor='customerName'>이름*</label>
                <input
                  id='customerName'
                  type='text'
                  placeholder=' 성함'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='rounded h-16 text-black-1000 p-1'
                />
                <label htmlFor='customerPhone'>휴대폰 번호*</label>
                <input
                  id='customerPhone'
                  type='tel'
                  placeholder=' 휴대폰 번호'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                className='bg-primary-600 p-4 mt-16 w-1/2 rounded-lg'
              >
                주문자 정보 변경
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CustomerChangeModal;
