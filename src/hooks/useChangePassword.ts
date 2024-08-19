import { useState } from 'react';
import { updatePassword } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';

const useChangePassword = () => {
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] =
    useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ) => {
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
  };

  return {
    currentPasswordError,
    newPasswordError,
    confirmNewPasswordError,
    error,
    isSuccessModalOpen,
    handleChangePassword,
    closeModal,
    setCurrentPasswordError,
    setNewPasswordError,
    setConfirmNewPasswordError,
  };
};

export default useChangePassword;
