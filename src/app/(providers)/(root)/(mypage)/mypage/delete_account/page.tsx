'use client';

import { deleteUser } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';

const DeleteAccountPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleDeleteAccount = async () => {
    if (user) {
      const responseData = await deleteUser(user.id);

      if (responseData.error) {
        console.error('회원탈퇴오류:', responseData.error);
        alert('회원탈퇴오류발생');
      } else {
        alert('회원탈퇴완료');
        router.replace('/');
      }
    }
  };

  return (
    <div>
      <p className='text-2xl mb-9'>회원탈퇴</p>
      <div>
        <button onClick={handleDeleteAccount}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
