'use client';

import {
  useResetDefaultAddress,
  useSetDefaultAddress,
} from '@/hooks/useAddresses';
import { Address } from '@/types/userAddressType';
import { useState } from 'react';
import GenericModal from '../../common/GenericModal';

type AddressActionsBtnProps = {
  userId: string;
  selectedAddressId: string | null;
  addressesLength: number;
  setShowAddressAddModal: (show: boolean) => void;
  setEditAddress: (address: Address | null) => void;
};

const maxAddresses = 3;

const AddressActionsBtn = ({
  userId,
  selectedAddressId,
  addressesLength,
  setShowAddressAddModal,
  setEditAddress,
}: AddressActionsBtnProps) => {
  const setDefaultAddressMutation = useSetDefaultAddress();
  const resetDefaultAddressMutation = useResetDefaultAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetDefaultAddress = async () => {
    if (!selectedAddressId) {
      alert('기본 배송지를 설정할 주소를 선택해주세요.');
      return;
    }

    try {
      await resetDefaultAddressMutation.mutateAsync(userId);
      await setDefaultAddressMutation.mutateAsync(selectedAddressId);
      alert('기본배송지 설정완료');
    } catch (error) {
      console.error('기본 배송지 설정 오류', error);
    }
  };

  const handleAddressAddClick = () => {
    if (addressesLength >= maxAddresses) {
      setIsModalOpen(true);
      return;
    }
    setEditAddress(null); // 추가 모드로 전환
    setShowAddressAddModal(true);
  };

  return (
    <>
      <div className='flex items-center justify-end gap-2 text-black-50'>
        <button
          className='bg-primary-400 py-2 px-3 rounded-md text-sm transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
          onClick={handleAddressAddClick}
        >
          새 배송지 추가
        </button>
        <button
          className='bg-primary-400 py-2 px-3 rounded-md text-sm transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
          onClick={handleSetDefaultAddress}
        >
          기본배송지 등록
        </button>
      </div>
      <GenericModal
        isOpen={isModalOpen}
        title='배송지 추가가능 개수 초과'
        content={
          <>
            배송지는 최대 3개까지
            <br />
            등록하여 관리할 수 있습니다.
          </>
        }
        buttonText='확인'
        buttonAction={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AddressActionsBtn;
