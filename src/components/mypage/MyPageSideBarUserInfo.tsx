'use client';

import useAuthStore from '@/zustand/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/services/community';
import { MyPost } from '@/types/communityType';
import HeartWhiteIcon16px from '../common/icons/16px/HeartWhiteIcon16px';
import { useEffect, useState } from 'react';
import { userLoginInfo } from '@/services/auth';
import { getLikeLength } from '@/services/mypage';
import Link from 'next/link';
import { orbitron } from '../../../public/fonts/orbitron';
import useLastSelectWishListStore from '@/zustand/store/useLastSelectWishListStore';

const MyPageSideBarUserInfo = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const [likeCount, setLikeCount] = useState(0);
  const { setLastSelectTab } = useLastSelectWishListStore();

  useEffect(() => {
    userLoginInfo().then((res) => {
      saveUser(res);
    });
    if (user?.id) {
      getLikeLength(user.id).then((data) => {
        const totalLikedItems = data.totalLikedItems || 0;
        setLikeCount(totalLikedItems);
      });
    }
  }, [saveUser, user?.id]);

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
    <div className='h-[60px] py-2 gap-1 flex flex-col sm:px-5 md:px-5 sm:gap-2'>
      <p className={`text-xl sm:text-[28px] ${orbitron.className}`}>
        {emailId}
      </p>
      <div className='flex flex-row items-center text-xs gap-2'>
        <Link href={'/mypage/my_posts'} className='flex gap-1 text-center'>
          <p>작성글 수</p>
          <p>{postCount}</p>
        </Link>
        <p>|</p>
        <Link
          href={'/wishlist'}
          className='flex gap-1 text-center'
          onClick={() => setLastSelectTab('LikedGoods')}
        >
          <HeartWhiteIcon16px />
          <p>{likeCount}</p>
        </Link>
      </div>
    </div>
  );
};

export default MyPageSideBarUserInfo;
