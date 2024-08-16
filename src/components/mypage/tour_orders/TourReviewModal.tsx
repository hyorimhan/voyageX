'use client';

import StarFalseIcon32px from '@/components/common/icons/32px/StarFalseIcon32px';
import StarTrueIcon32px from '@/components/common/icons/32px/StarTrueIcon32px';
import React, { useEffect, useState } from 'react';
import CloseIcon32px from '@/components/common/icons/32px/CloseIcon32px';
import TextArea from '../goods_orders/TextArea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  useGetOrderedTourReviewId,
  useGetTourReview,
} from '@/hooks/apis/review.api';
import { createTourReview, modifyTourReview } from '@/services/review';

type TourReviewModalProps = {
  onClose: () => void;
  tourId?: string;
  userId: string;
  order_id?: string;
};

const TourReviewModal = ({
  onClose,
  tourId,
  userId,
  order_id,
}: TourReviewModalProps) => {
  const queryClient = useQueryClient();
  const { data: prevReviewId } = useGetOrderedTourReviewId({
    order_id: order_id!,
    tour_id: tourId!,
  });
  const { data: loadedReview, isPending } = useGetTourReview({
    user_id: userId,
    tour_id: tourId!,
    review_id: prevReviewId?.review_id!,
  });
  const isReviewed = !!prevReviewId?.review_id;

  const [review, setReview] = useState('');
  const [invalidMsg, setInvalidMsg] = useState('');
  const [rating, setRating] = useState<number>(3);

  const handleRating = (index: number) => {
    setRating(index + 1); // 클릭한 별의 인덱스를 기준으로 별점 업데이트
  };

  const { mutate: createTourReviewMutate } = useMutation({
    mutationFn: createTourReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['tourOrders', userId] });
      toast.success('리뷰를 작성했습니다.');
      onClose();
    },
  });

  const { mutate: modifyTourReviewMutate } = useMutation({
    mutationFn: modifyTourReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['tourOrders', userId] });
      toast.success('리뷰를 수정했습니다.');
      onClose();
    },
  });

  const handleSubmit = async () => {
    if (rating === 0) {
      setInvalidMsg('별점을 선택해주세요.');
      return;
    }
    if (!review.trim()) {
      setInvalidMsg('내용을 작성해주세요.');
      return;
    }
    if (!isReviewed) {
      const review_id = crypto.randomUUID();
      createTourReviewMutate({
        review_id,
        user_id: userId,
        tour_id: tourId!,
        order_id: order_id!,
        rating,
        review,
      });
    } else {
      modifyTourReviewMutate({
        review_id: prevReviewId.review_id,
        user_id: userId,
        tour_id: tourId!,
        rating,
        review,
      });
    }
  };

  useEffect(() => {
    if (loadedReview) {
      setReview(loadedReview?.review ?? '');
      setRating(loadedReview?.rating ?? 3);
    }
  }, [isPending, loadedReview]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-30'>
      <div className='bg-black-800 p-8 rounded-lg text-base gap-8 flex flex-col w-[500px]'>
        <div>
          <div className='flex justify-end mb-3'>
            <button onClick={onClose}>
              <CloseIcon32px />
            </button>
          </div>
          <p className='text-xl flex justify-center'>리뷰 작성</p>
        </div>
        <div>
          <p className='text-black-400'>별점 ({rating}.0/5.0)</p>
          <div className='flex items-center justify-center'>
            {[...Array(5)].map((_, index) => (
              <button key={index} onClick={() => handleRating(index)}>
                {index < rating ? <StarTrueIcon32px /> : <StarFalseIcon32px />}
              </button>
            ))}
            <div className='p-1 mt-1'>
              <p className='bg-primary-100 py-[2px] text-primary-500 rounded-full ml-2 text-[10px] font-bold w-[73px] text-center'>
                {rating === 5
                  ? '아주 좋아요!'
                  : rating === 4
                  ? '좋아요'
                  : rating === 3
                  ? '보통이에요'
                  : rating === 2
                  ? '그저 그래요'
                  : rating === 1
                  ? '별로에요'
                  : '불러오는 중..'}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className='text-black-400'>리뷰</p>
          <TextArea
            placeholder='구매하신 상품의 후기를 남겨주시면 다른 구매자들에게도 도움이 됩니다.'
            value={review}
            onChange={setReview}
            invalidMsg={invalidMsg}
            setInvalidMsg={setInvalidMsg}
          />
        </div>
        <button
          className='bg-primary-600 w-full p-5 rounded-lg text-black-50'
          onClick={handleSubmit}
          disabled={invalidMsg !== ''}
        >
          작성완료
        </button>
      </div>
    </div>
  );
};

export default TourReviewModal;
