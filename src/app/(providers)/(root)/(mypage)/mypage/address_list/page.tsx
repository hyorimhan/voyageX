'use client';

import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import AddressActionsBtn from '@/components/mypage/address_list/AddressActionsBtn';
import AddressAddModal from '@/components/mypage/address_list/AddressAddModal';
import AddressAddSheet from '@/components/mypage/address_list/AddressAddSheet';
import AddressesList from '@/components/mypage/address_list/AddressList';
import { Address } from '@/types/userAddressType';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddressListPage: React.FC = () => {
  const router = useRouter();
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

  const updateAddressesLength = (length: number) => {
    setAddressesLength(length);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex mb-9 gap-2 sm:mt-8'>
          <button
            className='self-center md:hidden lg:hidden'
            onClick={() => router.back()}
          >
            <ArrowLeftIcon24px />
          </button>
          <p className='text-2xl sm:text-xl'>배송지 관리</p>
        </div>
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
      <div className='flex gap-4 w-full text-center mt-6 justify-end sm:hidden'>
        <p className='w-[78px]'>주소별칭</p>
        <p className='w-[363px]'>배송주소</p>
        <p className='w-[173px]'>받는 분 / 연락처</p>
        <p className='w-[79px]'>관리</p>
      </div>
      <div className='border-b-[1px] border-white mt-3 sm:hidden'></div>
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
        <>
          <div className='sm:hidden'>
            <AddressAddModal
              onClose={() => setShowAddressAddModal(false)}
              editMode={!!editAddress}
              initialData={editAddress}
            />
          </div>
          <div className='md:hidden lg:hidden'>
            <AddressAddSheet
              showAddressAddModal={showAddressAddModal}
              setShowAddressAddModal={setShowAddressAddModal}
              editMode={!!editAddress}
              initialData={editAddress}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AddressListPage;
