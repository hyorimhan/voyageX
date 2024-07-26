import { Dispatch, SetStateAction, useState } from 'react';
import { Address, Customer } from './OrderForm';
import CustomerChangeModal from './CustomerChangeModal';

interface CustomerInfoProps {
  customerInfo: Customer;
  setCustomerInfo: Dispatch<SetStateAction<Customer>>;
}

function CustomerInfo({ customerInfo, setCustomerInfo }: CustomerInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user_id = 'gusdnr0839@gmail.com';

  return (
    <>
      <div className='border-2 border-black-300 rounded-lg p-4'>
        <div className='py-4 mb-4 border-b-2 border-black-700 flex flex-row items-start justify-between'>
          <span className='text-xl text-black-50'>주문자 정보</span>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-primary-400 rounded-lg p-2'
            >
              주문자정보 변경
            </button>
          </div>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div className='flex flex-row items-center gap-8'>
            <div className='flex flex-col gap-4 text-black-200'>
              <p>받는 분</p>
              <p>휴대전화 번호</p>
              <p>이메일 주소</p>
            </div>
            <div className='flex flex-col gap-4 text-black-50'>
              <p>{customerInfo?.customerName}</p>
              <p>{customerInfo?.customerPhone}</p>
              <p>{customerInfo?.customerEmail}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CustomerChangeModal
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default CustomerInfo;
