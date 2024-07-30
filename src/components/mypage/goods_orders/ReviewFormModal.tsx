'use client';

import StarFalseIcon32px from '@/components/common/icons/32px/StarFalseIcon32px';
import StarTrueIcon32px from '@/components/common/icons/32px/StarTrueIcon32px';
import React, { useState } from 'react';
import TextArea from './TextArea';
import CloseIcon32px from '@/components/common/icons/32px/CloseIcon32px';
import { createClient } from '@/supabase/client';

type ReviewFormModallProps = {
  onClose: () => void;
  goodsId: string;
  userId: string;
};

const supabase = createClient();

const ReviewFormModal: React.FC<ReviewFormModallProps> = ({
  onClose,
  goodsId,
  userId,
}) => {
  const [review, setReview] = useState('');
  const [invalidMsg, setInvalidMsg] = useState('');
  const [rating, setRating] = useState<number>(3);

  const handleRating = (index: number) => {
    setRating(index + 1); // 클릭한 별의 인덱스를 기준으로 별점 업데이트
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setInvalidMsg('별점을 선택해주세요.');
      return;
    }

    const { data, error } = await supabase.from('goods_reviews').insert([
      {
        user_id: userId,
        goods_id: goodsId,
        rating,
        review,
      },
    ]);

    if (error) {
      console.error('리뷰 작성 오류:', error);
      setInvalidMsg('리뷰 작성 중 오류가 발생했습니다.');
    } else {
      console.log('리뷰 작성 성공:', data);
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-30'>
      <div className='bg-black-800 p-8 rounded-lg text-base gap-8 flex flex-col w-[400px]'>
        <div>
          <div className='flex justify-end mb-3'>
            <button onClick={onClose}>
              <CloseIcon32px />
            </button>
          </div>
          <p className='text-xl flex justify-center'>리뷰 작성</p>
        </div>
        <div>
          <p className='text-black-400'>별점 ({rating}/5)</p>
          <div className='flex items-center justify-center'>
            {[...Array(5)].map((_, index) => (
              <button key={index} onClick={() => handleRating(index)}>
                {index < rating ? <StarTrueIcon32px /> : <StarFalseIcon32px />}
              </button>
            ))}
            <div className='p-1'>
              <p className='bg-primary-100 px-4 py-[2px] text-primary-500 rounded-full ml-2 text-[10px] font-bold'>
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
                  : ''}
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

export default ReviewFormModal;
