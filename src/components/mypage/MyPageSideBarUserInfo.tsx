'use client';

import useAuthStore from '@/zustand/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/services/community';
import { MyPost } from '@/types/communityType';
import HeartWhiteIcon16px from '../common/icons/16px/HeartWhiteIcon16px';
import { useEffect, useState } from 'react';
import { userLoginInfo } from '@/services/auth';
import ShareLink from '../common/ShareLink';

const MyPageSideBarUserInfo = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);

  useEffect(() => {
    userLoginInfo().then((res) => {
      saveUser(res.user);
    });
  }, []);

  const { data: posts, isLoading } = useQuery<MyPost[]>({
    queryKey: ['myPosts', user?.id],
    queryFn: () => getMyPosts(user?.id),
  });

  if (isLoading) {
    return <p>우주선에 탑승중...</p>;
  }

  const postCount = posts?.length || 0;
  const emailId = user?.email ? user.email.split('@')[0] : '비회원';

  return (
    <div className='h-[60px] py-2 gap-1 flex flex-col'>
      <p className='text-xl'>{emailId}</p>
      <div className='flex flex-row items-center text-xs gap-2'>
        <p>작성글 수</p>
        <p>{postCount}</p>
        <p>|</p>
        <div className='flex gap-1'>
          <HeartWhiteIcon16px />
          <p>35</p>
        </div>
      </div>
    </div>
  );
};

export default MyPageSideBarUserInfo;
