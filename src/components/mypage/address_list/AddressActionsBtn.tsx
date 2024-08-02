'use client';

import { resetDefaultAddress, setDefaultAddress } from '@/services/address';
import { Address } from '@/types/userAddressType';

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
  const handleSetDefaultAddress = async () => {
    if (!selectedAddressId) {
      alert('기본 배송지를 설정할 주소를 선택해주세요.');
      return;
    }

    try {
      await resetDefaultAddress(userId);
      await setDefaultAddress(selectedAddressId);

      alert('기본배송지 설정완료');
    } catch (error) {
      console.error('기본 배송지 설정 오류', error);
    }
  };

  const handleAddressAddClick = () => {
    if (addressesLength >= maxAddresses) {
      alert('최대 주소 개수인 3개를 초과할 수 없습니다.');
      return;
    }
    setEditAddress(null); // 추가 모드로 전환
    setShowAddressAddModal(true);
  };

  return (
    <div className='flex items-center justify-end gap-2 text-black-50'>
      <button
        className='bg-primary-400 p-2  rounded-md text-xs transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
        onClick={handleAddressAddClick}
      >
        새 배송지 추가
      </button>
      <button
        className='bg-primary-400 p-2 rounded-md text-xs transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
        onClick={handleSetDefaultAddress}
      >
        기본배송지 설정
      </button>
    </div>
  );
};

export default AddressActionsBtn;
