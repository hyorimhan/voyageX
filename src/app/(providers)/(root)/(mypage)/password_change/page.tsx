'use client';

import { updatePassword } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import { useState } from 'react';

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const user = useAuthStore((state) => state.user);

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    // 비밀번호 일치 확인 dla

    if (!currentPassword) {
      setError('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (!newPassword) {
      setError('신규 비밀번호를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('신규 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!user?.email) {
      setError('사용자 이메일을 찾을 수 없습니다.');
      return;
    }

    try {
      const response = await updatePassword(
        user.email,
        currentPassword,
        newPassword,
      );

      if (response.error) {
        setError(response.error.message);
        return;
      }

      setSuccess('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <p className='text-2xl mb-9'>비밀번호 변경</p>
      <div className='flex flex-col pr-80 text-black-400'>
        <div className='flex flex-col mb-7 gap-2'>
          <label>현재 비밀번호</label>
          <input
            className='text-black rounded-lg h-14 p-7'
            placeholder='현재 비밀번호를 입력해주세요'
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-7 gap-2'>
          <label>신규 비밀번호</label>
          <input
            className='text-black rounded-lg h-14 p-7'
            placeholder='신규 비밀번호를 입력해주세요'
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-4 gap-2'>
          <label>신규 비밀번호 확인</label>
          <input
            className='text-black rounded-lg h-14 p-7'
            placeholder='신규 비밀번호를 다시 한 번 입력해주세요'
            type='password'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}
        <button
          className='bg-primary-600 h-14 rounded-lg text-white'
          onClick={handleChangePassword}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PasswordChangePage;
