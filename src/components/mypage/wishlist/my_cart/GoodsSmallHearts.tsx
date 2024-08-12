'use client';

import { toggleLikeGoodsParamsType } from '@/types/goods';

import toast from 'react-hot-toast';
import {
  useGetIsLikedGoodsByUser,
  useToggleLikeGoods,
} from '@/hooks/apis/goods.api';
import HeartDefaultIcon24px from '@/components/common/icons/24px/HeartDefaultIcon24px';
import HeartPressedIcon24px from '@/components/common/icons/24px/HeartPressedIcon24px';

interface HeartsProps {
  goods_id: string;
  user_id?: string;
}

function GoodsSmallHearts({ goods_id, user_id }: HeartsProps) {
  const {
    data: isLiked,
    isError,
    isPending,
  } = useGetIsLikedGoodsByUser(goods_id, user_id!);

  const { mutate: likeMutate } = useToggleLikeGoods(goods_id, user_id!);

  const handleToggleLike = () => {
    if (!user_id) return toast.error('로그인 해주세요!');
    if (isLiked === undefined) return;
    const toggleParams: toggleLikeGoodsParamsType = {
      goods_id,
      user_id,
      isLiked,
    };
    likeMutate(toggleParams);
  };

  if (isError) return <div>에러</div>;
  if (isPending) return <HeartDefaultIcon24px />;

  return (
    <span
      className={`cursor-pointer ${
        isLiked ? 'text-primary-400' : 'text-black-50'
      }`}
      onClick={handleToggleLike}
    >
      {user_id ? (
        isLiked ? (
          <HeartPressedIcon24px />
        ) : (
          <HeartDefaultIcon24px />
        )
      ) : (
        <HeartDefaultIcon24px />
      )}
    </span>
  );
}

export default GoodsSmallHearts;
