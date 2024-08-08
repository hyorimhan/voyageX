'use client';

import PenIcon24px from '@/components/common/icons/24px/PenIcon24px';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';

const WriteButton = () => {
  const user = useAuthStore((state) => state.user);
  const route = useRouter();

  const handleClickWrite = () => {
    if (!user) return alert('로그인 후 이용하실 수 있습니다');
    route.push('/community/write');
  };

  return (
    <button
      onClick={handleClickWrite}
      className='flex justify-center items-center bg-primary-100 rounded-full w-[56px] h-[56px]'
    >
      <PenIcon24px />
    </button>
  );
};

export default WriteButton;
