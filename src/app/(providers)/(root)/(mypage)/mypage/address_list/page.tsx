'use client';

import AddressActionsBtn from '@/components/mypage/address_list/AddressActionsBtn';
import AddressAddModal from '@/components/mypage/address_list/AddressAddModal';
import AddressesList from '@/components/mypage/address_list/AddressList';
import { useAddAddress } from '@/hooks/useAddresses';
import { Address } from '@/types/userAddressType';
import useAuthStore from '@/zustand/store/useAuth';
import { useState } from 'react';

const AddressListPage: React.FC = () => {
  const [showAddressAddModal, setShowAddressAddModal] =
    useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const [addressesLength, setAddressesLength] = useState<number>(0);

  const user = useAuthStore((state) => state.user);

  const handleEditAddressClick = (address: Address) => {
    setEditAddress(address); // 수정 모드로 전환
    setShowAddressAddModal(true);
  };

  const handleAddAddress = () => {
    setShowAddressAddModal(false);
  };

  const updateAddressesLength = (length: number) => {
    setAddressesLength(length);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className='flex flex-col'>
        <p className='text-2xl mb-9'>배송지 관리</p>
        {user && (
          <AddressActionsBtn
            userId={user.id}
            selectedAddressId={selectedAddressId}
            addressesLength={addressesLength}
            setShowAddressAddModal={setShowAddressAddModal}
            setEditAddress={setEditAddress}
          />
        )}
      </div>
      <div className='flex gap-4 w-full text-center mt-6 justify-end'>
        <p className='w-[78px]'>주소별칭</p>
        <p className='w-[363px]'>배송주소</p>
        <p className='w-[173px]'>받는 분 / 연락처</p>
        <p className='w-[79px]'>관리</p>
      </div>
      <div className='border-b-[1px] border-white mt-3'></div>
      {user && (
        <AddressesList
          userId={user.id}
          selectedAddressId={selectedAddressId}
          onSelectAddress={handleSelectAddress}
          onEditAddress={handleEditAddressClick}
          updateAddressesLength={updateAddressesLength}
        />
      )}
      {showAddressAddModal && (
        <AddressAddModal
          onClose={() => setShowAddressAddModal(false)}
          onAddAddress={handleAddAddress}
          editMode={!!editAddress}
          initialData={editAddress}
        />
      )}
    </div>
  );
};

export default AddressListPage;
