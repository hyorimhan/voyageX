'use client';

import { useEffect, useState } from 'react';
import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';

export type AddressType = {
  id: string;
  user_id: string;
  contact: string;
  address: string;
  address_name: string;
  email: string;
};

function OrderForm() {
  const [expressInfo, setExpressInfo] = useState({
    id: '1',
    user_id: 'gusdnr',
    contact: '010-1234-1234',
    address: '무슨시 무슨구',
    address_name: '집',
    email: 'abc123@abc.com',
  });
  const [customerName, setCustomerName] = useState(expressInfo.user_id);
  const [phoneNumber, setPhoneNumber] = useState(expressInfo.contact);
  const [email, setEmail] = useState(expressInfo.email);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmitOrderForm: React.FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();
    alert('주문이 완료되었습니다!');
  };

  useEffect(() => {
    setCustomerName(expressInfo.user_id);
    setPhoneNumber(expressInfo.contact);
    setEmail(expressInfo.email);
  }, [expressInfo]);

  return (
    <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmitOrderForm}>
      <ExpressInfo setExpressInfo={setExpressInfo} />
      <div className='flex flex-col py-4 mt-10'>
        <span className='text-xl pb-4'>고객정보</span>
        <label className='text-[#999999] mb-1' htmlFor='name'>
          이름*
        </label>
        <input
          id='name'
          type='text'
          placeholder=' 이름을 입력해주세요.'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className='w-1/2 h-16 rounded-lg text-black p-1'
        />
        <label className='text-[#999999] mb-1' htmlFor='phone'>
          휴대폰번호*
        </label>
        <input
          id='phone'
          type='text'
          placeholder=' 휴대폰번호를 입력해주세요.'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className='w-1/2 h-16 rounded-lg text-black p-1'
        />
        <label className='text-[#999999] mb-1' htmlFor='name'>
          이메일*
        </label>
        <input
          id='email'
          type='email'
          placeholder=' 이메일을 입력해주세요.'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-1/2 h-16 rounded-lg text-black p-1'
        />
      </div>
      <ItemsInfo setTotalPrice={setTotalPrice} />
      <PayButton totalPrice={totalPrice} />
    </form>
  );
}

export default OrderForm;
