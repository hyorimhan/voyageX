'use client';

import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import AddressApiScript from './AddressApiScript';
import { createClient } from '@/supabase/client';
import useAuthStore from '@/zustand/store/useAuth';
import AddressSearchModal from './AddressSearchModal';
import addressForm from './addressForm';
import AddressAddModalInput from './AddressAddModalInput';
import CloseIcon32px from '@/components/common/icons/32px/CloseIcon32px';

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
      <div className='bg-black-800 p-8 rounded-lg shadow-lg relative w-[432px]'>
        <div className='flex justify-center mb-8 flex-col'>
          <div className='flex justify-end mb-3'>
            <button onClick={onClose}>
              <CloseIcon32px />
            </button>
          </div>
          <p className='text-2xl text-center'>
            {editMode ? '배송지 수정' : '배송지 추가'}
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <AddressAddModalInput
            label='주소별칭'
            placeholder='6글자 이내로 입력해주세요.'
            value={alias}
            onChange={handleAliasChange}
            error={aliasError}
          />
          <AddressAddModalInput
            label='받으실분'
            placeholder='이름을 입력해주세요.'
            value={recipient}
            onChange={handleRecipientChange}
            error={recipientError}
          />
          <AddressAddModalInput
            label='휴대폰 번호'
            placeholder='-를 제외하고 입력해주세요.'
            value={phone}
            onChange={handlePhoneChange}
            error={phoneError}
          />
          <div>
            <label className='text-black-200'>배송주소</label>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-3 items-center justify-evenly'>
                <AddressAddModalInput
                  placeholder={''}
                  label=''
                  value={postcode}
                  onChange={() => {}}
                  readOnly
                  onClick={() => setShowAddressSearchModal(true)}
                />
                <button
                  className='px-6 py-5 bg-white text-black-1000 rounded-lg w-[155px] flex items-center h-[59px]'
                  onClick={() => setShowAddressSearchModal(true)}
                >
                  우편번호 찾기
                </button>
              </div>
              <AddressAddModalInput
                label=''
                placeholder='주소를 입력해주세요.'
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
              <AddressAddModalInput
                label=''
                placeholder='상세주소를 입력해주세요.'
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className='w-full mt-8 px-4 py-4 bg-primary-600 rounded-lg'
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
