'use client';

import GenericModal from '@/components/common/GenericModal';
import { deletePost } from '@/services/community';
import useAuthStore from '@/zustand/store/useAuth';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function PostButtons({ postId, userId }: { postId: string; userId: string }) {
  const user = useAuthStore((state) => state.user);
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: removePost } = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
  });

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    removePost(postId);
    route.push('/community');
    toast.success('삭제가 완료되었습니다.');
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex gap-3 pb-10'>
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
      <GenericModal
        isOpen={isModalOpen}
        title='게시글 삭제'
        content='정말로 이 게시글을 삭제하시겠습니까?'
        buttonText='삭제'
        buttonAction={confirmDelete}
        cancelText='취소'
        cancelAction={cancelDelete}
      />
    </div>
  );
}

export default PostButtons;
