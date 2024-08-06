'use client';

import Loading from '@/components/common/Loading';
import HeartDefaultIcon32px from '@/components/common/icons/32px/HeartDefaultIcon32px';
import HeartPressedIcon32px from '@/components/common/icons/32px/HeartPressedIcon32px';
import {
  useGetIsLikedTourByUser,
  useToggleLikeTours,
} from '@/hooks/apis/tours.api';
import { toggleLikeToursParamsType } from '@/types/tour';
import toast from 'react-hot-toast';

interface TourHeartsProps {
  tour_id: string;
  user_id?: string;
}

function TourHearts({ tour_id, user_id }: TourHeartsProps) {
  const {
    data: isLiked,
    isError,
    isPending,
  } = useGetIsLikedTourByUser(tour_id, user_id!);

  const { mutate: likeMutate } = useToggleLikeTours(tour_id, user_id!);

  const handleToggleLike = () => {
    if (!user_id) return toast.error('로그인 해주세요!');
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
        {user_id ? (
          isLiked ? (
            <HeartPressedIcon32px />
          ) : (
            <HeartDefaultIcon32px />
          )
        ) : (
          <HeartDefaultIcon32px />
        )}
      </span>
    </>
  );
}

export default TourHearts;
