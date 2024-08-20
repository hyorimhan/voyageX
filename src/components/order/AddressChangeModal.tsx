'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import AddressesList from '../mypage/address_list/AddressList';
import AddressAddModal from '../mypage/address_list/AddressAddModal';
import { Address } from '@/types/userAddressType';
import useAuthStore from '@/zustand/store/useAuth';
import AddressChangeButton from './AddressChangeButton';
import CloseWhiteIcon24px from '../common/icons/24px/CloseWhiteIcon24px';

interface AddressChangeModalProps {
  addressList: Address[];
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AddressChangeModal({
  addressList,
  isModalOpen,
  setIsModalOpen,
}: AddressChangeModalProps) {
  const modalBackground = useRef(null);
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.documentElement.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section
      ref={modalBackground}
      className='flex w-full h-full fixed top-0 left-0 justify-center bg-black-1000 bg-opacity-50 z-30'
      onClick={(e) => {
        if (e.target === modalBackground.current) setIsModalOpen(false);
      }}
    >
      <div className='relative bg-black-800 rounded-lg py-8 px-14 my-auto h-[650px]'>
        <div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <div className='flex justify-end'>
                <button onClick={() => setIsModalOpen(false)}>
                  <CloseWhiteIcon24px />
                </button>
              </div>
              <div className='flex justify-center'>
                <p className='text-xl font-semibold'>배송지 변경</p>
              </div>
            </div>
            {user && (
              <AddressChangeButton
                userId={user.id}
                selectedAddressId={selectedAddressId}
                addressesLength={addressesLength}
                setShowAddressAddModal={setShowAddressAddModal}
                setEditAddress={setEditAddress}
                setIsModalOpen={setIsModalOpen}
                addressList={addressList}
              />
            )}
          </div>
          <div className='flex gap-3 w-full text-center mt-6 justify-end'>
            <p className='w-[56px]'>주소별칭</p>
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
              editMode={!!editAddress}
              initialData={editAddress}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default AddressChangeModal;
