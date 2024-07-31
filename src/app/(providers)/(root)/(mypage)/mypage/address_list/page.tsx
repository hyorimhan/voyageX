'use client';

import { deleteAddress } from '@/app/api/mypage/address/list/route';
import AddressActionsBtn from '@/components/mypage/address_list/AddressActionsBtn';
import AddressAddModal from '@/components/mypage/address_list/AddressAddModal';
import AddressesList from '@/components/mypage/address_list/AddressList';
import { useFetchAddresses } from '@/hooks/addressHooks';
import { createClient } from '@/supabase/client';
import { Address } from '@/types/userAddressType';
import useAuthStore from '@/zustand/store/useAuth';
import { useState } from 'react';

const supabase = createClient();

const AddressListPage: React.FC = () => {
  const [showAddressAddModal, setShowAddressAddModal] =
    useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const user = useAuthStore((state) => state.user);
  const {
    data: addresses,
    error,
    refetch,
  } = useFetchAddresses(user?.id || null);

  const handleEditAddressClick = (address: Address) => {
    setEditAddress(address); // 수정 모드로 전환
    setShowAddressAddModal(true);
  };

  const handleAddAddress = () => {
    setShowAddressAddModal(false);
    refetch();
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id);
      refetch();
    } catch (error) {
      console.error('삭제 오류', error);
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId((prev) => (prev === id ? null : id));
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className='flex flex-col'>
        <p className='text-2xl mb-9'>배송지 관리</p>
        {user && (
          <AddressActionsBtn
            userId={user.id}
            selectedAddressId={selectedAddressId}
            refetch={refetch}
            onAddAddressClick={() => {}}
            addressesLength={addresses ? addresses.length : 0} // New prop
            setShowAddressAddModal={setShowAddressAddModal} // New prop
            setEditAddress={setEditAddress} // New prop
          />
        )}
      </div>
      <div className='flex gap-4 w-full text-center mt-6 justify-end'>
        <p className='w-[78px]'>주소별칭</p>
        <p className='w-[363px]'>배송주소</p>
        <p className='w-[173px]'>받는 분 / 연락처</p>
        <p className='w-[79px]'>관리</p>
      </div>
      <div className='border-b-[1px] border-white mt-3'></div>
      {user && addresses && (
        <AddressesList
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={handleSelectAddress}
          onEditAddress={handleEditAddressClick}
          onDeleteAddress={handleDeleteAddress}
        />
      )}
      {showAddressAddModal && (
        <AddressAddModal
          onClose={() => setShowAddressAddModal(false)}
          onAddAddress={handleAddAddress}
          editMode={!!editAddress}
          initialData={editAddress}
        />
      )}
    </div>
  );
};

export default AddressListPage;
