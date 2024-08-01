'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddressActionsBtn from '../mypage/address_list/AddressActionsBtn';
import AddressesList from '../mypage/address_list/AddressList';
import AddressAddModal from '../mypage/address_list/AddressAddModal';
import { Address } from '@/types/userAddressType';
import useAuthStore from '@/zustand/store/useAuth';
import useExpressInfoStore from '@/zustand/store/expressInfoStore';
import toast from 'react-hot-toast';

interface AddressChangeModalProps {
  addressList: Address[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AddressChangeModal({
  addressList,
  setIsModalOpen,
}: AddressChangeModalProps) {
  const { expressAddress, setExpressAddress } = useExpressInfoStore(
    (state) => state,
  );

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

  const handleChangeAddress = () => {
    setExpressAddress(
      addressList.find((address) => address.id === selectedAddressId) ?? null,
    );
    console.log('expressAddress => ', expressAddress);
    setIsModalOpen(false);
    toast.success('배송지가 변경되었습니다!');
  };

  return (
    <section
      className={`flex w-full h-full fixed top-0 left-0 justify-center bg-black-1000 bg-opacity-50 z-30`}
    >
      <div className='relative bg-black-800 rounded-lg p-8 my-20'>
        <div>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between items-start'>
              <p className='text-2xl mb-9'>배송지 관리</p>
              <button onClick={() => setIsModalOpen(false)}>X</button>
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
        <button onClick={handleChangeAddress}>배송지 변경</button>
      </div>
    </section>
  );
}

export default AddressChangeModal;
