'use client';

import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import AddressApiScript from './AddressApiScript';
import { createClient } from '@/supabase/client';
import useAuthStore from '@/zustand/store/useAuth';
import AddressSearchModal from './AddressSearchModal';
import addressForm from './addressForm';

interface AddressAddModalProps {
  onClose: () => void;
  onAddAddress: (address: any) => void;
  editMode: boolean;
  initialData?: any;
}

const AddressAddModal: React.FC<AddressAddModalProps> = ({
  onClose,
  onAddAddress,
  editMode,
  initialData,
}) => {
  const {
    postcode,
    setPostcode,
    newAddress,
    setNewAddress,
    oldAddress,
    setOldAddress,
    detailAddress,
    setDetailAddress,
    alias,
    aliasError,
    handleAliasChange,
    recipient,
    recipientError,
    handleRecipientChange,
    phone,
    phoneError,
    handlePhoneChange,
  } = addressForm(initialData);

  const [showAddressSearchModal, setShowAddressSearchModal] =
    useState<boolean>(false);

  const supabase = createClient();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (editMode && initialData) {
      setPostcode(initialData.postcode || '');
      setNewAddress(initialData.address || '');
      setOldAddress(initialData.oldAddress || '');
      setDetailAddress(initialData.detailAddress || '');
    }
  }, [
    editMode,
    initialData,
    setPostcode,
    setNewAddress,
    setOldAddress,
    setDetailAddress,
  ]);

  const handleAddressComplete = (
    postcode: string,
    newAddress: string,
    oldAddress: string,
  ) => {
    setPostcode(postcode);
    setNewAddress(newAddress);
    setOldAddress(oldAddress);
    setDetailAddress('');
    setShowAddressSearchModal(false);
  };

  const handleSave = async () => {
    if (aliasError || recipientError || phoneError) {
      alert('옳바르게 작성되지 않은 항목이 있습니다.');
      return;
    }

    if (
      !alias ||
      !recipient ||
      !phone ||
      !postcode ||
      !newAddress ||
      !oldAddress
    ) {
      alert('작성하지 않은 항목이 있습니다.');
      return;
    }

    if (!user || !user.id) {
      alert('사용자 정보를 가져오지 못했습니다. 다시 로그인 해주세요.');
      return;
    }

    const newAddressData = {
      alias,
      postcode,
      address: newAddress,
      oldAddress,
      detailAddress,
      recipient,
      phone,
      user_id: user.id,
    };

    try {
      if (editMode && initialData) {
        const { error } = await supabase
          .from('addresses')
          .update(newAddressData)
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert([newAddressData]);

        if (error) throw error;
      }

      onAddAddress(newAddressData);
      alert('주소가 저장되었습니다.');
      onClose();
    } catch (error) {
      alert('주소 저장에 실패했습니다.');
      console.log(error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-30'>
      <AddressApiScript />
      <div className='bg-black-800 p-6 rounded-lg shadow-lg relative w-96'>
        <div className='flex justify-center items-center mt-3'>
          <p className='text-lg'>{editMode ? '배송지 수정' : '배송지 추가'}</p>
          <button className='absolute right-4 top-4' onClick={onClose}>
            <IoMdClose className='text-3xl' />
          </button>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-black-200 mb-1'>주소별칭</label>
            <input
              className='w-full px-3 py-4 border rounded-lg text-black-400'
              placeholder='6글자 이내로 입력해주세요.'
              value={alias}
              onChange={handleAliasChange}
            />
            {aliasError && (
              <p className='text-error-900 text-xs mt-1'>{aliasError}</p>
            )}
          </div>
          <div>
            <label className='block text-black-200 mb-1'>받으실분</label>
            <input
              className='w-full px-3 py-4 border rounded-lg text-black-400'
              placeholder='이름을 입력해주세요.'
              value={recipient}
              onChange={handleRecipientChange}
            />
            {recipientError && (
              <p className='text-error-900 text-xs mt-1'>{recipientError}</p>
            )}
          </div>
          <div>
            <label className='block text-black-200 mb-1'>휴대폰 번호</label>
            <input
              className='w-full px-3 py-4 border rounded-lg text-black-400'
              placeholder='-를 제외하고 입력해주세요.'
              value={phone}
              onChange={handlePhoneChange}
            />
            {phoneError && (
              <p className='text-error-900 text-xs mt-1'>{phoneError}</p>
            )}
          </div>
          <div>
            <label className='block text-black-200 mb-1'>배송주소</label>
            <div className='flex gap-2'>
              <input
                className='px-3 py-4 border rounded-lg text-black-400 h-14 w-[190px]'
                placeholder=''
                value={postcode}
                readOnly
              />
              <button
                className='px-6 bg-white text-black-1000 rounded-lg w-full'
                onClick={() => setShowAddressSearchModal(true)}
              >
                우편번호 찾기
              </button>
            </div>
            <input
              className='mt-2 w-full px-3 py-4 border rounded-lg text-black-300'
              placeholder='주소를 입력해주세요.'
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <input
              className='mt-2 w-full px-3 py-4 border rounded-lg text-black-400'
              placeholder='상세주소를 입력해주세요.'
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
        </div>
        <button
          className='w-full mt-6 px-4 py-4 bg-primary-600 rounded-lg'
          onClick={handleSave}
        >
          저장하기
        </button>
      </div>
      {showAddressSearchModal && (
        <AddressSearchModal
          onComplete={handleAddressComplete}
          onClose={() => setShowAddressSearchModal(false)}
        />
      )}
    </div>
  );
};

export default AddressAddModal;
