'use client';

import AddressAddModal from '@/components/mypage/AddressAddModal';
import { createClient } from '@/supabase/client';
import useAuthStore from '@/zustand/store/useAuth';
import { useEffect, useState } from 'react';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

type Address = {
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

  useEffect(() => {
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

    fetchAddresses();
  }, [supabase, user]);

  const handleAddressAddClick = () => {
    setShowAddressAddModal(true);
  };

  const handleAddAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
    setShowAddressAddModal(false);
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
      <div className='flex gap-10 w-full text-center text-lg mt-3'>
        <p className='ml-24'>주소별칭</p>
        <p className='w-80 ml-6'>배송주소</p>
        <p className='w-36 ml-8'>받으실분/연락처</p>
        <p>관리</p>
      </div>
      <div className='border-b-2 border-solid border-white mt-3'></div>
      {addresses.map((address, index) => (
        <div key={index}>
          <div className='flex w-full text-center py-7 items-center'>
            <MdOutlineRadioButtonUnchecked className='text-3xl ml-7 mr-7' />
            <p className='text-lg w-28 text-center'>{address.alias}</p>
            <div className='text-left text-xs w-80 ml-16 flex-grow'>
              <p>({address.postcode})</p>
              <p>
                도로명 : {address.address} {address.detailAddress}
              </p>
              <p>
                지번 : {address.oldAddress} {address.detailAddress}
              </p>
            </div>
            <div className='text-base'>
              <p className='mb-3'>{address.recipient}</p>
              <p className='text-xs'>{address.phone}</p>
            </div>
            <div className='gap-3 flex justify-center ml-10 text-xs'>
              <button className='bg-black-900 border-2 border-solid border-primary-600 p-2 rounded-md'>
                수정
              </button>
              <button className='bg-black-600 p-2 rounded-md'>삭제</button>
              {/* 🎈 */}
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
