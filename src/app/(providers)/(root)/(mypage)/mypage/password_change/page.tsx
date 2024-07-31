'use client';

import PasswordChangeInput from '@/components/mypage/password_change/PasswordChangeInput';
import PasswordChangeSuccessModal from '@/components/mypage/password_change/PasswordChangeSuccessModal';
import { updatePassword } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import { useState } from 'react';

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] =
    useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  const handleChangePassword = async () => {
    setError('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');

    if (!currentPassword) {
      setCurrentPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (!newPassword) {
      setNewPasswordError('신규 비밀번호를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('신규 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!user?.email) {
      setCurrentPasswordError('사용자 이메일을 찾을 수 없습니다.');
      return;
    }

    const response = await updatePassword({
      email: user.email,
      currentPassword,
      newPassword,
    });

    if (response.error) {
      if (response.error.field === 'currentPassword') {
        setCurrentPasswordError(response.error.message);
      } else if (response.error.field === 'newPassword') {
        setNewPasswordError(response.error.message);
      } else {
        setConfirmNewPasswordError(response.error.message);
      }
      return;
    }

    setIsSuccessModalOpen(true);
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div>
      <p className='text-2xl mb-9'>비밀번호 변경</p>
      <div className='flex flex-col pr-80 text-black-400 gap-4'>
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
          onClick={handleChangePassword}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PasswordChangePage;
