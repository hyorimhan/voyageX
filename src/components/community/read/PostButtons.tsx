'use client';

import PenIcon24px from '@/components/common/icons/24px/PenIcon24px';
import { deletePost } from '@/services/community';
import useAuthStore from '@/zustand/store/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function PostButtons({ postId, userId }: { postId: string; userId: string }) {
  const user = useAuthStore((state) => state.user);
  const route = useRouter();

  const handleClickWrite = () => {
    if (!user) return alert('로그인 후 이용하실 수 있습니다');
    route.push('/community/write');
  };

  const { mutate: removePost } = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
  });

  const handleClickDelete = () => {
    removePost(postId);
    alert('삭제가 완료되었습니다.');
    route.push('/community');
  };

  return (
    <div className='flex gap-3 pb-10'>
      <button
        className='rounded-lg bg-primary-600 px-3 py-2 flex justify-center items-center gap-1'
        onClick={handleClickWrite}
      >
        <PenIcon24px />
        글쓰기
      </button>
      {user?.id === userId && (
        <>
          <Link
            className='text-primary-700 rounded-lg bg-primary-100 px-3 py-2 flex justify-center items-center gap-1'
            href={`/community/edit/${postId}`}
          >
            수정
          </Link>
          <button
            className='text-primary-700 rounded-lg bg-primary-100 px-3 py-2 flex justify-center items-center gap-1'
            onClick={handleClickDelete}
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
}

export default PostButtons;
