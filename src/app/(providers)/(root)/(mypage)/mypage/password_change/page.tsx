'use client';

import PasswordChangeInput from '@/components/mypage/password_change/PasswordChangeInput';
import PasswordChangeSuccessModal from '@/components/mypage/password_change/PasswordChangeSuccessModal';
import useChangePassword from '@/hooks/useChangePassword';
import { useState } from 'react';

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const {
    currentPasswordError,
    newPasswordError,
    confirmNewPasswordError,
    isSuccessModalOpen,
    handleChangePassword,
    closeModal,
  } = useChangePassword();

  const onSubmit = async () => {
    await handleChangePassword(
      currentPassword,
      newPassword,
      confirmNewPassword,
    );
  };

  return (
    <div>
      <p className='text-2xl mb-9'>비밀번호 변경</p>
      <div className='flex flex-col pr-[268px] text-black-400 gap-4'>
        <PasswordChangeInput
          label='현재 비밀번호'
          placeholder='현재 비밀번호를 입력해주세요'
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={currentPasswordError}
        />
        <PasswordChangeInput
          label='신규 비밀번호'
          placeholder='신규 비밀번호를 입력해주세요'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={newPasswordError}
        />
        <PasswordChangeInput
          label='신규 비밀번호 확인'
          placeholder='신규 비밀번호를 다시 한 번 입력해주세요'
          type='password'
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          error={confirmNewPasswordError}
        />
        <PasswordChangeSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={closeModal}
        />
        <button
          className='bg-primary-600 h-14 rounded-lg text-white mt-8'
          onClick={onSubmit}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PasswordChangePage;
