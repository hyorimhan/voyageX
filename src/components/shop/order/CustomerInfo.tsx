import { Customer } from '@/types/userAddressType';
import { Dispatch, SetStateAction } from 'react';

interface CustomerInfoProps {
  customerInfo: Customer;
  setCustomerInfo: Dispatch<SetStateAction<Customer>>;
}

function CustomerInfo({ customerInfo, setCustomerInfo }: CustomerInfoProps) {
  const user_id = 'gusdnr0839@gmail.com';

  return (
    <>
      <div className='border-2 border-white rounded-lg p-4'>
        <div className='py-4 mb-4'>
          <span className='text-xl'>주문자 정보</span>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div>
            <p>{customerInfo?.customerName}</p>
            <p>{customerInfo?.customerPhone}</p>
            <p>{customerInfo?.customerEmail}</p>
          </div>
          <div>
            <button className='bg-primary-400 rounded-lg p-2'>정보 변경</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
