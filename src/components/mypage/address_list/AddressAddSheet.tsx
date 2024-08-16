'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import AddressApiScript from './AddressApiScript';
import useAuthStore from '@/zustand/store/useAuth';
import AddressSearchModal from './AddressSearchModal';
import addressForm from './addressForm';
import AddressAddModalInput from './AddressAddModalInput';
import CloseIcon32px from '@/components/common/icons/32px/CloseIcon32px';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress, updateAddress } from '@/services/address';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

type AddressAddModalProps = {
  showAddressAddModal: boolean;
  setShowAddressAddModal: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  initialData?: any;
};

const AddressAddSheet: React.FC<AddressAddModalProps> = ({
  showAddressAddModal,
  setShowAddressAddModal,
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

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 0,
    },
  };

  const modalTransition = {
    type: 'spring',
    stiffness: 500,
    damping: 50,
  };

  const [showAddressSearchModal, setShowAddressSearchModal] =
    useState<boolean>(false);

  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const { mutate: addAddressMutate } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user!.id] });
      toast.success('새로운 배송지가 저장되었습니다.');
      setShowAddressAddModal(false);
    },
  });
  const { mutate: updateAddressMutate } = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user!.id] });
      toast.success('배송지 정보가 수정되었습니다.');
      setShowAddressAddModal(false);
    },
  });

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
      toast.error('모든 항목을 정확히 입력해주세요.');
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
      toast.error('작성하지 않은 항목이 있습니다.');
      return;
    }

    if (!user || !user.id) {
      toast.error('사용자 정보를 가져오지 못했습니다. 다시 로그인 해주세요.');
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
    };

    try {
      if (editMode && initialData) {
        updateAddressMutate({
          addressId: initialData.id,
          address: newAddressData,
        });
      } else {
        addAddressMutate({ userId: user.id, address: newAddressData });
      }
    } catch (error) {
      toast.error('주소 저장에 실패했습니다.');
      console.log(error);
    }
  };

  const isSaveDisabled = !!(
    aliasError ||
    recipientError ||
    phoneError ||
    !alias ||
    !recipient ||
    !phone ||
    !postcode ||
    !newAddress ||
    !oldAddress
  );

  useEffect(() => {
    if (showAddressAddModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.documentElement.style.overflow = '';
    };
  }, [showAddressAddModal]);

  return (
    <AnimatePresence>
      <motion.section
        className='fixed inset-0 flex items-end justify-center bg-black-1000 bg-opacity-50 z-30'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddressAddModal(false);
          }
        }}
      >
        <AddressApiScript />
        <motion.div
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={modalTransition}
          className='bg-black-800 p-8 rounded-t-lg shadow-lg relative w-full'
        >
          <div className='flex justify-center mb-5 flex-col'>
            <div className='flex justify-end mb-3'>
              <button onClick={() => setShowAddressAddModal(false)}>
                <CloseIcon32px />
              </button>
            </div>
            <p className='text-2xl text-center'>
              {editMode ? '배송지 수정' : '배송지 추가'}
            </p>
          </div>
          <div className='flex flex-col gap-4'>
            <AddressAddModalInput
              label='주소별칭*'
              placeholder='6글자 이내로 입력해주세요.'
              value={alias}
              onChange={handleAliasChange}
              error={aliasError}
            />
            <AddressAddModalInput
              label='받으실분*'
              placeholder='이름을 입력해주세요.'
              value={recipient}
              onChange={handleRecipientChange}
              error={recipientError}
            />
            <AddressAddModalInput
              label='휴대폰 번호*'
              placeholder='-를 제외하고 입력해주세요.'
              value={phone}
              onChange={handlePhoneChange}
              error={phoneError}
            />
            <div>
              <label className='text-black-200 text-sm'>배송주소*</label>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-3 items-center justify-evenly'>
                  <AddressAddModalInput
                    placeholder={''}
                    label=''
                    value={postcode}
                    readOnly
                    disabled
                  />
                  <button
                    className='bg-white text-black-1000 rounded-lg w-[125px] flex h-[48px] text-sm justify-center items-center'
                    onClick={() => setShowAddressSearchModal(true)}
                  >
                    우편번호 찾기
                  </button>
                </div>
                <AddressAddModalInput
                  label=''
                  placeholder='주소를 입력해주세요.'
                  value={newAddress}
                  disabled
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
            className={`w-full mt-5 px-4 py-4 rounded-lg ${
              isSaveDisabled
                ? 'bg-black-400 cursor-not-allowed text-black-200'
                : 'bg-primary-600 hover:bg-primary-400 active:bg-primary-500 text-black-50'
            }`}
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            저장하기
          </button>
        </motion.div>
        {showAddressSearchModal && (
          <AddressSearchModal
            onComplete={handleAddressComplete}
            onClose={() => setShowAddressSearchModal(false)}
          />
        )}
      </motion.section>
    </AnimatePresence>
  );
};

export default AddressAddSheet;
