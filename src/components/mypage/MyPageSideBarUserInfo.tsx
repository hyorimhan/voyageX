'use client';

import useAuthStore from '@/zustand/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/services/community';
import { MyPost } from '@/types/communityType';
import { IoMdHeart } from 'react-icons/io';
import React from 'react';

const MyPageSideBarUserInfo = () => {
  const user = useAuthStore((state) => state.user);
  const emailId = user?.email ? user.email.split('@')[0] : '비회원';

  // 사용자가 작성한 게시물 가져오기
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<MyPost[]>({
    queryKey: ['myPosts', user?.id],
    queryFn: () => getMyPosts(user?.id),
    enabled: !!user?.id, // user.id가 있을 때만 실행
  });

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }

  const postCount = posts?.length || 0;

  return (
    <div className='h-[60px] py-2 gap-1 flex flex-col'>
      <p className='text-xl'>{emailId}</p>
      <div className='flex flex-row items-center text-xs gap-2'>
        <p>작성글 수</p>
        <p>{postCount}</p>
        <p>|</p>
        <IoMdHeart className='ml-1' />
        <p>35</p>
      </div>
    </div>
  );
};

export default MyPageSideBarUserInfo;
