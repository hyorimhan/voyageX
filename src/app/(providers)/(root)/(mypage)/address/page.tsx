'use client';

import AddressAddModal from '@/components/mypage/AddressAddModal';
import React, { useState } from 'react';

const Address = () => {
  const [showAddressAddModal, setShowAddressAddModal] = useState(false);

  const handleAddressAddClick = () => {
    setShowAddressAddModal(true);
  };

  return (
    <div>
      <div className='flex'>
        <p className='text-4xl'>배송지 관리</p>
        <div>
          <button onClick={handleAddressAddClick}>새 배송지 추가</button>
          <button>기본배송지 설정</button>
        </div>
      </div>
      <div className='flex gap-10'>
        <p>주소별칭</p>
        <p>배송주소</p>
        <p>받으실분/연락처</p>
        <p>관리</p>
      </div>
      {showAddressAddModal && (
        <AddressAddModal onClose={() => setShowAddressAddModal(false)} />
      )}
    </div>
  );
};

export default Address;
