'use client';

import {
  useResetDefaultAddress,
  useSetDefaultAddress,
} from '@/hooks/useAddresses';
import { Address } from '@/types/userAddressType';
import { useState } from 'react';
import GenericModal from '../../common/GenericModal';
import toast from 'react-hot-toast';

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
      toast.error('기본 배송지로 설정할 주소를 선택해주세요.');
      return;
    }

    try {
      await resetDefaultAddressMutation.mutateAsync(userId);
      await setDefaultAddressMutation.mutateAsync(selectedAddressId);
      toast.success('기본배송지가 설정되었습니다.');
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
      <div className='flex items-center justify-end gap-2 text-black-50 sm:hidden'>
        <button
          className='bg-primary-400 py-2 px-3 rounded-md text-sm hover:bg-primary-200 active:bg-primary-300'
          onClick={handleAddressAddClick}
        >
          새 배송지 추가
        </button>
        <button
          className='bg-primary-400 py-2 px-3 rounded-md text-sm hover:bg-primary-200 active:bg-primary-300'
          onClick={handleSetDefaultAddress}
        >
          기본배송지 등록
        </button>
      </div>
      <div className='flex items-center gap-2 text-black-50 md:hidden lg:hidden'>
        <button
          className='bg-primary-400 py-2 px-3 rounded-md text-xs hover:bg-primary-200 active:bg-primary-300 w-2/3'
          onClick={handleSetDefaultAddress}
        >
          기본 배송지 등록
        </button>
        <button
          className='bg-transparent border-primary-400 border-[1px] py-2 px-3 rounded-md text-xs hover:bg-primary-200 hover:text-primary-700 active:bg-primary-300 active:text-primary-700 w-1/3'
          onClick={handleAddressAddClick}
        >
          새 배송지 추가
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
