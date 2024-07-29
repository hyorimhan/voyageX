'use client';

import AddressAddModal from '@/components/mypage/address_list/AddressAddModal';
import { createClient } from '@/supabase/client';
import useAuthStore from '@/zustand/store/useAuth';
import { useEffect, useState } from 'react';
import { PiCheckCircleThin } from 'react-icons/pi';
import { PiCircleThin } from 'react-icons/pi';

type Address = {
  id: string;
  alias: string | null;
  postcode: string | null;
  address: string | null;
  oldAddress: string | null;
  detailAddress: string | null;
  recipient: string | null;
  phone: string | null;
  is_default: boolean;
};

const maxAddresses = 3; // 최대 주소지 제한

const AddressListPage: React.FC = () => {
  const [showAddressAddModal, setShowAddressAddModal] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const supabase = createClient();
  const user = useAuthStore((state) => state.user);

  const fetchAddresses = async () => {
    if (!user || !user.id) return;

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (error) {
      console.error('Error fetching addresses:', error);
    } else {
      setAddresses(data);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [supabase, user]);

  const handleAddressAddClick = () => {
    if (addresses.length >= maxAddresses) {
      alert('최대 주소 개수인 3개를 초과할 수 없습니다.');
      return;
    }
    setEditAddress(null); // 추가 모드로 전환
    setShowAddressAddModal(true);
  };

  const handleEditAddressClick = (address: Address) => {
    setEditAddress(address); // 수정 모드로 전환
    setShowAddressAddModal(true);
  };

  const handleAddAddress = () => {
    setShowAddressAddModal(false);
    fetchAddresses();
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      const { error } = await supabase.from('addresses').delete().eq('id', id);

      if (error) throw error;

      fetchAddresses();
    } catch (error) {
      console.error('삭제오류', error);
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId((prev) => (prev === id ? null : id));
  };

  const handleSetDefaultAddress = async () => {
    if (!selectedAddressId) {
      alert('기본 배송지를 설정할 주소를 선택해주세요.');
      return;
    }
    if (!user || !user.id) return;

    try {
      // 모든 기존 기본 배송지를 해제
      const { error: resetError } = await supabase
        .from('addresses')
        .update({ is_default: false } as Partial<Address>)
        .eq('user_id', user.id);

      if (resetError) throw resetError;

      // 선택한 주소를 기본 배송지로 설정
      const { error: setError } = await supabase
        .from('addresses')
        .update({ is_default: true } as Partial<Address>)
        .eq('id', selectedAddressId);

      if (setError) throw setError;

      alert('기본배송지 설정완료');

      fetchAddresses();
    } catch (error) {
      console.error('기본 배송지 설정 오류', error);
    }
  };

  return (
    <div>
      <div className='flex flex-col'>
        <p className='text-2xl mb-9'>배송지 관리</p>
        <div className='flex items-center justify-end'>
          <button
            className='bg-primary-400 p-2 rounded-md mr-2 text-xs'
            onClick={handleAddressAddClick}
          >
            새 배송지 추가
          </button>
          <button
            className='bg-primary-400 p-2 rounded-md text-xs'
            onClick={handleSetDefaultAddress}
          >
            기본배송지 설정
          </button>
        </div>
      </div>
      <div className='flex gap-4 w-full text-center text-lg mt-6'>
        <p className='w-40 text-end'>주소별칭</p>
        <p className='flex-grow'>배송주소</p>
        <p className='w-40'>받으실분/연락처</p>
        <p className='w-24'>관리</p>
      </div>
      <div className='border-b-2 border-solid border-white mt-3'></div>
      {addresses.map((address, index) => (
        <div key={index}>
          <div className='flex w-full text-center py-6 items-center'>
            <span onClick={() => handleSelectAddress(address.id)}>
              {selectedAddressId === address.id ? (
                <PiCheckCircleThin className='text-3xl w-20' />
              ) : (
                <PiCircleThin className='text-3xl w-20' />
              )}
            </span>
            <div>
              {address.is_default && (
                <p className='text-primary-400 text-xs'>기본배송지</p>
              )}
              <p className='text-base w-24 text-center'>{address.alias}</p>
            </div>
            <div className='text-left text-xs w-96 ml-3 px-5'>
              <p className='mb-1'>({address.postcode})</p>
              <p>
                도로명 : {address.address} {address.detailAddress}
              </p>
              <p>
                지번 : {address.oldAddress} {address.detailAddress}
              </p>
            </div>
            <div className='text-xs w-48'>
              <p className='mb-1'>{address.recipient}</p>
              <p>{address.phone}</p>
            </div>
            <div className='gap-2 flex text-xs w-24 justify-center items-center'>
              <button
                className='bg-black-1000 border-2 border-solid border-primary-600 p-2 rounded-md h-8'
                onClick={() => handleEditAddressClick(address)}
              >
                수정
              </button>
              {!address.is_default && (
                <button
                  className='bg-black-600 p-2 rounded-md h-8'
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  삭제
                </button>
              )}
            </div>
          </div>
          <div className='border-b-2 border-solid border-black-700 '></div>
        </div>
      ))}
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
