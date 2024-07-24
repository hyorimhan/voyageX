'use client';

import AddressAddModal from '@/components/mypage/AddressAddModal';
import { useState } from 'react';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

interface Address {
  alias: string;
  postcode: string;
  address: string;
  oldAddress: string;
  detailAddress: string;
  recipient: string;
  phone: string;
}

const AddressListPage: React.FC = () => {
  const [showAddressAddModal, setShowAddressAddModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const handleAddressAddClick = () => {
    setShowAddressAddModal(true);
  };

  const handleAddAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
    setShowAddressAddModal(false);
  };

  return (
    <div>
      <div className='flex justify-between'>
        <p className='text-2xl mb-6'>배송지 관리</p>
        <div className='flex items-center'>
          <button
            className='bg-slate-700 p-2 rounded-md mr-2 h-8 text-xs'
            onClick={handleAddressAddClick}
          >
            새 배송지 추가
          </button>
          <button className='bg-slate-700 p-2 rounded-md h-8 text-xs'>
            기본배송지 설정
          </button>
        </div>
      </div>
      <div className='flex gap-10 w-full text-center text-lg mt-3'>
        <p className='ml-24'>주소별칭</p>
        <p className='w-80 ml-6'>배송주소</p>
        <p className='w-36 ml-8'>받으실분/연락처</p>
        <p>관리</p>
      </div>
      <div className='border-b-2 border-solid border-white mt-3'></div>
      {addresses.map((address, index) => (
        <div key={index}>
          <div className='flex w-full text-center py-7 items-center'>
            <MdOutlineRadioButtonUnchecked className='text-3xl ml-7 mr-7' />
            <p className='text-lg w-28 text-center'>{address.alias}</p>
            <div className='text-left text-xs w-80 ml-16'>
              <p>({address.postcode})</p>
              <p>
                도로명 : {address.address} {address.detailAddress}
              </p>
              <p>
                지번 : {address.oldAddress} {address.detailAddress}
              </p>
            </div>
            <div className='text-base ml-20'>
              <p className='mb-3'>{address.recipient}</p>
              <p className='text-xs'>{address.phone}</p>
            </div>
            <div className='gap-3 flex justify-center ml-10 text-xs'>
              <button className='bg-slate-500 p-1 rounded-sm'>수정</button>
              <button className='bg-slate-500 p-1 rounded-sm'>삭제</button>
            </div>
          </div>
          <div className='border-b-2 border-solid border-white mt-3'></div>
        </div>
      ))}
      {showAddressAddModal && (
        <AddressAddModal
          onClose={() => setShowAddressAddModal(false)}
          onAddAddress={handleAddAddress}
        />
      )}
    </div>
  );
};

export default AddressListPage;
