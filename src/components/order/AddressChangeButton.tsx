'use client';

import { useResetDefaultAddress } from '@/hooks/useAddresses';
import { Address } from '@/types/userAddressType';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import GenericModal from '../common/GenericModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setDefaultAddress } from '@/services/address';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';

type AddressActionsBtnProps = {
  userId: string;
  selectedAddressId: string | null;
  addressesLength: number;
  setShowAddressAddModal: (show: boolean) => void;
  setEditAddress: (address: Address | null) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  addressList: Address[];
};

const maxAddresses = 3;

const AddressChangeButton = ({
  userId,
  selectedAddressId,
  addressesLength,
  setShowAddressAddModal,
  setEditAddress,
  setIsModalOpen,
  addressList,
}: AddressActionsBtnProps) => {
  const queryClient = useQueryClient();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const { setExpressAddress } = useExpressInfoStore((state) => state);
  const resetDefaultAddressMutation = useResetDefaultAddress();
  const setDefaultAddressMutation = useMutation({
    mutationFn: (addressId: string) => setDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setExpressAddress(
        addressList.find((address) => address.id === selectedAddressId) ?? null,
      );
      toast.success('기본배송지가 설정되었습니다.');
      setIsModalOpen(false);
    },
  });

  const handleSetDefaultAddress = async () => {
    if (!selectedAddressId) {
      toast.error('기본 배송지로 설정할 주소를 선택해주세요.');
      return;
    }

    try {
      await resetDefaultAddressMutation.mutateAsync(userId);
      await setDefaultAddressMutation.mutateAsync(selectedAddressId);
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
          className='bg-transparent border-primary-400 border-[1px] py-2 px-3 rounded-md text-xs hover:bg-primary-200 hover:text-primary-700 active:bg-primary-300 active:text-primary-700 w-full'
          onClick={handleSetDefaultAddress}
        >
          기본 배송지 등록
        </button>
        <button
          className='bg-primary-400 py-2 px-3 rounded-md text-xs hover:bg-primary-200 active:bg-primary-300 w-full'
          onClick={handleAddressAddClick}
        >
          새 배송지 추가
        </button>
      </div>
      <GenericModal
        isOpen={isErrorOpen}
        title='배송지 추가가능 개수 초과'
        content={
          <>
            배송지는 최대 3개까지
            <br />
            등록하여 관리할 수 있습니다.
          </>
        }
        buttonText='확인'
        buttonAction={() => setIsErrorOpen(false)}
      />
    </>
  );
};

export default AddressChangeButton;
