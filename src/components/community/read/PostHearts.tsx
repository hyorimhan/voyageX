import React from 'react';
import HeartDefaultIcon32px from '@/components/common/icons/32px/HeartDefaultIcon32px';
import HeartPressedIcon32px from '@/components/common/icons/32px/HeartPressedIcon32px';
import HeartDefaultIcon20px from '@/components/common/icons/20px/HeartDefaultIcon20px';
import HeartPressedIcon20px from '@/components/common/icons/20px/HeartPressedIcon20px';
import Loading from '@/components/common/Loading';
import toast from 'react-hot-toast';
import {
  useGetIsLikedPostByUser,
  useToggleLikePost,
} from '@/hooks/apis/community.api';

interface PostHeartsProps {
  post_id: string;
  user_id?: string;
  size?: 'small' | 'large';
}

function PostHearts({ post_id, user_id, size = 'large' }: PostHeartsProps) {
  const {
    data: isLiked,
    isError,
    isPending,
  } = useGetIsLikedPostByUser(post_id, user_id!);

  const { mutate: likeMutate } = useToggleLikePost(post_id, user_id!);

  const handleToggleLike = () => {
    if (!user_id) return toast.error('로그인 해주세요!');
    if (isLiked === undefined) return;
    likeMutate(isLiked);
  };

  if (isPending) return <Loading />;

  if (isError) return <div>Error</div>;

  const HeartIcon =
    size === 'large'
      ? isLiked
        ? HeartPressedIcon32px
        : HeartDefaultIcon32px
      : isLiked
      ? HeartPressedIcon20px
      : HeartDefaultIcon20px;

  return (
    <span className={`cursor-pointer`} onClick={handleToggleLike}>
      {user_id ? (
        <HeartIcon />
      ) : size === 'large' ? (
        <HeartDefaultIcon32px />
      ) : (
        <HeartDefaultIcon20px />
      )}
    </span>
  );
}

export default PostHearts;
