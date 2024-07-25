'use client';

import { useEffect, useState } from 'react';
import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';
import CustomerInfo from './CustomerInfo';

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
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.3fr)] gap-x-4'>
        <div className='flex flex-col items-start'>
          <div className='mt-4 w-full'>
            <ExpressInfo setExpressInfo={setExpressInfo} />
          </div>
          <div className='mt-4 w-full'>
            <CustomerInfo />
          </div>
          <div className='mt-4 w-full'>
            <ItemsInfo />
          </div>
        </div>
        <div>
          <PayButton />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
