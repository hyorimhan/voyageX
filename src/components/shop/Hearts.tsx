'use client';

import { useGetLikedGoodsByUser, useToggleLikeGoods } from '@/hooks/goodsHooks';
import { toggleLikeGoodsParamsType } from '@/types/goods';
import HeartDefaultIcon32px from '../common/icons/32px/HeartDefaultIcon32px';
import HeartPressedIcon32px from '../common/icons/32px/HeartPressedIcon32px';

interface HeartsProps {
  goods_id: string;
  user_id: string;
}

function Hearts({ goods_id, user_id }: HeartsProps) {
  const {
    data: isLiked,
    isError,
    isPending,
  } = useGetLikedGoodsByUser(goods_id, user_id);

  const { mutate: likeMutate } = useToggleLikeGoods(
    goods_id,
    user_id,
    isLiked!,
  );

  const handleToggleLike = () => {
    if (isLiked === undefined) return;
    const toggleParams: toggleLikeGoodsParamsType = {
      goods_id,
      user_id,
      isLiked,
    };
    likeMutate(toggleParams);
  };

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;

  return (
    <>
      <span
        className={`cursor-pointer ${
          isLiked ? 'text-primary-400' : 'text-black-50'
        }`}
        onClick={handleToggleLike}
      >
        {isLiked ? <HeartPressedIcon32px /> : <HeartDefaultIcon32px />}
      </span>
    </>
  );
}

export default Hearts;
