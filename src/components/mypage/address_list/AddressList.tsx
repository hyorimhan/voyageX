'use client';

import RadioDefaultIcon24px from '@/components/common/icons/24px/RadioDefaultIcon24px';
import RadioPressedIcon24px from '@/components/common/icons/24px/RadioPressedIcon24px';
import RadioHoveredIcon24px from '@/components/common/icons/24px/RadioHoveredIcon24px';
import AddressEditDeleteBtn from './AddressEditDeleteBtn';
import { useEffect, useState } from 'react';
import { useFetchAddresses } from '@/hooks/useAddresses';
import { Address } from '@/types/userAddressType';

type AddressesListProps = {
  userId: string;
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onEditAddress: (address: Address) => void;
  updateAddressesLength: (length: number) => void;
};

const AddressesList = ({
  userId,
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  updateAddressesLength,
}: AddressesListProps) => {
  const { data: addresses, error } = useFetchAddresses(userId);
  const [hoveredAddressId, setHoveredAddressId] = useState<string | null>(null);

  useEffect(() => {
    if (addresses) {
      updateAddressesLength(addresses.length);
    }
  }, [addresses, updateAddressesLength]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {addresses?.map((address, index) => (
        <div
          key={index}
          className='address-item'
          onMouseEnter={() => setHoveredAddressId(address.id)}
          onMouseLeave={() => setHoveredAddressId(null)}
        >
          <div className='flex text-center py-6'>
            <button
              onClick={() => onSelectAddress(address.id)}
              className='w-[68px] flex justify-center items-center relative'
            >
              {selectedAddressId === address.id ? (
                <RadioPressedIcon24px />
              ) : hoveredAddressId === address.id ? (
                <RadioHoveredIcon24px />
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
