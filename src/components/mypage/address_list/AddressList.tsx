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

  if (!addresses || addresses.length === 0) {
    return (
      <div className='flex items-center flex-col gap-[7px] mt-[56px]'>
        <p className='text-xl'>배송지가 없습니다.</p>
        <p className='text-sm'>새로운 배송지를 추가해보세요.</p>
      </div>
    );
  }

  return (
    <div>
      {addresses.map((address, index) => (
        <div
          key={index}
          className='address-item'
          onMouseEnter={() => setHoveredAddressId(address.id)}
          onMouseLeave={() => setHoveredAddressId(null)}
        >
          <div className='flex flex-col text-center py-4 sm:flex-wrap sm:py-[16px]'>
            <div className='flex'>
              <button
                onClick={() => onSelectAddress(address.id)}
                className='w-[68px] flex justify-center items-center relative mr-[27px] sm:m-0 sm:w-fit'
              >
                {selectedAddressId === address.id ? (
                  <RadioPressedIcon24px />
                ) : hoveredAddressId === address.id ? (
                  <RadioHoveredIcon24px />
                ) : (
                  <RadioDefaultIcon24px />
                )}
              </button>
              <div className='flex gap-1 self-center ml-2 text-center md:hidden lg:hidden'>
                <p className='text-xs text-center sm:text-xs'>
                  {address.alias}
                </p>
                {address.is_default && (
                  <p className='text-primary-200 text-[10px] sm:self-end'>
                    기본배송지
                  </p>
                )}
              </div>
            </div>
            <div className='flex items-center ml-2 sm:flex-wrap sm:gap-0 sm:ml-0'>
              <div className='w-[78px] flex flex-col text-center sm:hidden'>
                {address.is_default && (
                  <p className='text-primary-200 text-[10px]'>기본배송지</p>
                )}
                <p className='text-sm text-center'>{address.alias}</p>
              </div>
              <div className='text-left text-sm w-[363px] px-2 sm:text-xs sm:mt-2 sm:w-full'>
                <p className='mb-1 md:hidden lg:hidden'>{address.recipient}</p>
                <p className='mb-1 sm:mb-0'>({address.postcode})</p>
                <p>
                  도로명 : {address.address} {address.detailAddress}
                </p>
                <p>
                  지번 : {address.oldAddress} {address.detailAddress}
                </p>
              </div>
              <div className='text-sm ml-4 w-[173px] sm:flex sm:ml-2 sm:text-xs sm:w-full'>
                <p className='mb-1 sm:hidden'>{address.recipient}</p>
                <p>{address.phone}</p>
              </div>
            </div>
            <AddressEditDeleteBtn
              address={address}
              onEditAddress={onEditAddress}
            />
          </div>
          <div className='border-b-[1px] border-black-700 '></div>
        </div>
      ))}
    </div>
  );
};

export default AddressesList;
