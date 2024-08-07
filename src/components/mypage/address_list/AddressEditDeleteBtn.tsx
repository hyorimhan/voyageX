'use client';

import GenericModal from '@/components/common/GenericModal';
import { useDeleteAddress } from '@/hooks/useAddresses';
import { Address } from '@/types/userAddressType';
import { useState } from 'react';

type AddressEditDeleteBtnProps = {
  address: Address;
  onEditAddress: (address: Address) => void;
};

const AddressEditDeleteBtn = ({
  address,
  onEditAddress,
}: AddressEditDeleteBtnProps) => {
  const deleteAddressMutation = useDeleteAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddressMutation.mutateAsync(id);
    } catch (error) {
      console.error('삭제 오류', error);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteAddress(address.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='gap-1 flex flex-col text-xs w-[77px] justify-center items-center text-black-50'>
        <button
          className='bg-black-1000 border-[1px] border-primary-400 px-3 py-2 rounded-md transition-colors duration-200 hover:border-primary-200 active:border-primary-300'
          onClick={() => onEditAddress(address)}
        >
          수정
        </button>
        {!address.is_default && (
          <button
            className='bg-black-600 p-1 rounded-md border-[1px] px-3 py-2 border-black-600 transition-colors duration-200 hover:bg-black-400 active:bg-black-500'
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        )}
      </div>
      <GenericModal
        isOpen={isModalOpen}
        title='배송지 삭제'
        content='선택한 배송지를 삭제하시겠습니까?'
        buttonText='확인'
        buttonAction={confirmDelete}
        cancelText='취소'
        cancelAction={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AddressEditDeleteBtn;
