'use client';

import PenIcon20px from '@/components/common/icons/20px/PenIcon20px';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const WriteButton = () => {
  const user = useAuthStore((state) => state.user);
  const route = useRouter();

  const handleClickWrite = () => {
    if (!user) return toast.error('로그인 후 이용하실 수 있습니다');
    route.push('/community/write');
  };

  const handleClickMyPost = () => {
    route.push('/mypage/my_posts/');
  };

  return (
    <div className='flex gap-4'>
      {user && (
        <button
          onClick={handleClickMyPost}
          className='bg-black-1000 text-black-50 px-3 py-3 rounded-lg border-primary-600 border-[1px] sm:hidden'
        >
          내가 쓴 글 보러가기
        </button>
      )}
      <button
        onClick={handleClickWrite}
        className='flex items-center bg-primary-600 text-black-50 px-4 py-3 rounded-lg sm:text-sm sm:px-5 sm:py-2 gap-2'
      >
        <PenIcon20px />
        글쓰기
      </button>
    </div>
  );
};

export default WriteButton;
