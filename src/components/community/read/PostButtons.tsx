'use client';

import { deletePost } from '@/services/community';
import useAuthStore from '@/zustand/store/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function PostButtons({ postId, userId }: { postId: string; userId: string }) {
  const user = useAuthStore((state) => state.user);
  const route = useRouter();
  const queryClient = useQueryClient();

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
    <div className='flex gap-3'>
      <button onClick={handleClickWrite}>글쓰기</button>
      {user?.id === userId && (
        <>
          <Link href={`/community/edit/${postId}`}>수정</Link>
          <button onClick={handleClickDelete}>삭제</button>
        </>
      )}
    </div>
  );
}

export default PostButtons;
