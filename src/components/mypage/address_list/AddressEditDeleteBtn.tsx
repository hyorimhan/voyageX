'use client';

import { Address } from '@/types/userAddressType';

type AddressEditDeleteBtnProps = {
  address: Address;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
};

const AddressEditDeleteBtn = ({
  address,
  onEditAddress,
  onDeleteAddress,
}: AddressEditDeleteBtnProps) => {
  return (
    <div className='gap-2 flex text-xs w-[79px] justify-center items-center'>
      <button
        className='bg-black-1000 border-[1px] border-primary-400 p-1 rounded-md'
        onClick={() => onEditAddress(address)}
      >
        수정
      </button>
      {!address.is_default && (
        <button
          className='bg-black-600 p-1 rounded-md border-[1px] border-black-600'
          onClick={() => onDeleteAddress(address.id)}
        >
          삭제
        </button>
      )}
    </div>
  );
};

export default AddressEditDeleteBtn;
