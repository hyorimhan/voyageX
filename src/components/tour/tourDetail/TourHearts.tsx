'use client';

import Loading from '@/components/common/Loading';
// import { useGetLikedGoodsByUser, useToggleLikeGoods } from '@/hooks/goodsHooks';
import {
  useGetIsLikedTourByUser,
  useToggleLikeTours,
} from '@/hooks/toursHooks';
import { toggleLikeToursParamsType } from '@/types/tour';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

interface TourHeartsProps {
  tour_id: string;
  user_id?: string;
}

function TourHearts({ tour_id, user_id }: TourHeartsProps) {
  const {
    data: isLiked,
    isError,
    isPending,
  } = useGetIsLikedTourByUser(tour_id, user_id);

  const { mutate: likeMutate } = useToggleLikeTours(tour_id, user_id, isLiked!);

  const handleToggleLike = () => {
    if (isLiked === undefined) return;
    const toggleParams: toggleLikeToursParamsType = {
      tour_id,
      user_id,
      isLiked,
    };
    likeMutate(toggleParams);
  };

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;

  return (
    <>
      <span
        className={`cursor-pointer text-3xl ${
          isLiked ? 'text-primary-400' : 'text-black-50'
        }`}
        onClick={handleToggleLike}
      >
        {isLiked ? <IoHeart /> : <IoHeartOutline />}
      </span>
    </>
  );
}

export default TourHearts;
