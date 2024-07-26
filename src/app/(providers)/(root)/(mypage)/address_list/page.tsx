'use client';

import AddressAddModal from '@/components/mypage/address_list/AddressAddModal';
import { createClient } from '@/supabase/client';
import useAuthStore from '@/zustand/store/useAuth';
import { useEffect, useState } from 'react';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

type Address = {
  id: string;
  alias: string | null;
  postcode: string | null;
  address: string | null;
  oldAddress: string | null;
  detailAddress: string | null;
  recipient: string | null;
  phone: string | null;
};

const AddressListPage: React.FC = () => {
  const [showAddressAddModal, setShowAddressAddModal] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);

  const fetchAddresses = async () => {
    if (!user || !user.id) return;

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id);

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

  return (
    <div>
      <div className='flex justify-between'>
        <p className='text-2xl mb-6'>배송지 관리</p>
        <div className='flex items-center'>
          <button
            className='bg-primary-600 p-2 rounded-md mr-2 h-8 text-xs'
            onClick={handleAddressAddClick}
          >
            새 배송지 추가
          </button>
          <button className='bg-primary-600 p-2 rounded-md h-8 text-xs'>
            기본배송지 설정
          </button>
        </div>
      </div>
      <div className='flex gap-4 w-full text-center text-lg mt-3'>
        <p className='w-40 text-end'>주소별칭</p>
        <p className='flex-grow'>배송주소</p>
        <p className='w-40'>받으실분/연락처</p>
        <p className='w-24'>관리</p>
      </div>
      <div className='border-b-2 border-solid border-white mt-3'></div>
      {addresses.map((address, index) => (
        <div key={index}>
          <div className='flex w-full text-center py-5 items-center'>
            <MdOutlineRadioButtonUnchecked className='text-3xl w-20' />
            <p className='text-lg w-24 text-center'>{address.alias}</p>
            <div className='text-left text-xs w-96 ml-3 px-5'>
              <p>({address.postcode})</p>
              <p>
                도로명 : {address.address} {address.detailAddress}
              </p>
              <p>
                지번 : {address.oldAddress} {address.detailAddress}
              </p>
            </div>
            <div className='text-xs w-48'>
              <p className='mb-3'>{address.recipient}</p>
              <p>{address.phone}</p>
            </div>
            <div className='gap-3 flex text-xs w-28 justify-end'>
              <button className='bg-black-1000 border-2 border-solid border-primary-600 p-2 rounded-md h-8'>
                수정
              </button>
              <button
                className='bg-black-600 p-2 rounded-md h-8'
                onClick={() => handleDeleteAddress(address.id)}
              >
                삭제
              </button>
            </div>
          </div>
          <div className='border-b-2 border-solid border-white mt-3'></div>
        </div>
      ))}
      {showAddressAddModal && (
        <AddressAddModal
          onClose={() => setShowAddressAddModal(false)}
          onAddAddress={handleAddAddress}
        />
      )}
    </div>
  );
};

export default AddressListPage;
