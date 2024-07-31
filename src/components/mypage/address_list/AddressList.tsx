'use client';

import RadioDefaultIcon24px from '@/components/common/icons/24px/RadioDefaultIcon24px';
import RadioPressedIcon24px from '@/components/common/icons/24px/RadioPressedIcon24px';
import { Address } from '@/types/userAddressType';
import AddressEditDeleteBtn from './AddressEditDeleteBtn';

type AddressesListProps = {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
};

const AddressesList = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  onDeleteAddress,
}: AddressesListProps) => {
  return (
    <div>
      {addresses?.map((address, index) => (
        <div key={index}>
          <div className='flex text-center py-6'>
            <button
              onClick={() => onSelectAddress(address.id)}
              className='w-[68px] flex justify-center items-center'
            >
              {selectedAddressId === address.id ? (
                <RadioPressedIcon24px />
              ) : (
                <RadioDefaultIcon24px />
              )}
            </button>
            <div className='flex gap-4 items-center'>
              <div className='w-[78px] flex flex-col text-center'>
                {address.is_default && (
                  <p className='text-primary-200 text-[10px]'>기본배송지</p>
                )}
                <p className='text-sm text-center'>{address.alias}</p>
              </div>
              <div className='text-left text-sm w-[363px] px-2'>
                <p className='mb-1'>({address.postcode})</p>
                <p>
                  도로명 : {address.address} {address.detailAddress}
                </p>
                <p>
                  지번 : {address.oldAddress} {address.detailAddress}
                </p>
              </div>
              <div className='text-sm w-[173px]'>
                <p className='mb-1'>{address.recipient}</p>
                <p>{address.phone}</p>
              </div>
              <AddressEditDeleteBtn
                address={address}
                onEditAddress={onEditAddress}
                onDeleteAddress={onDeleteAddress}
              />
            </div>
          </div>
          <div className='border-b-[1px] border-black-700 '></div>
        </div>
      ))}
    </div>
  );
};

export default AddressesList;
