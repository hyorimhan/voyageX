'use client';

import { useEffect, useState } from 'react';
import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';
import CustomerInfo from './CustomerInfo';

export type Address = {
  alias: string;
  postcode: string;
  address: string;
  oldAddress: string;
  detailAddress: string;
  recipient: string;
  phone: string;
};

export type Customer = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
};

function OrderForm() {
  const user_email = 'gusdnr0839@gmail.com';
  const [expressInfo, setExpressInfo] = useState<Address>({
    alias: '집',
    postcode: '52453',
    address: '경남 남해군 창선면 창선로94번길 11-2 (상죽리)',
    oldAddress: '경남 남해군 창선면 상죽리 80',
    detailAddress: '초록색대문',
    recipient: 'gusdnr',
    phone: '010-1234-1234',
  });
  const [customerInfo, setCustomerInfo] = useState<Customer>({
    customerName: expressInfo.recipient,
    customerPhone: expressInfo.phone,
    customerEmail: 'gusdnr0839@gmail.com',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmitOrderForm: React.FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();
    alert('주문이 완료되었습니다!');
  };

  useEffect(() => {
    setCustomerInfo((prev) => ({
      ...prev,
      customerName: expressInfo.recipient,
      customerPhone: expressInfo.phone,
      customerEmail: user_email,
    }));
  }, [expressInfo]);

  return (
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.3fr)] gap-x-10'>
        <div className='flex flex-col items-start'>
          <div className='mt-4 w-full'>
            <ExpressInfo
              expressInfo={expressInfo}
              setExpressInfo={setExpressInfo}
            />
          </div>
          <div className='mt-4 w-full'>
            <CustomerInfo
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>
          <div className='mt-4 w-full'>
            <ItemsInfo setTotalPrice={setTotalPrice} />
          </div>
        </div>
        <div>
          <PayButton totalPrice={totalPrice} />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
