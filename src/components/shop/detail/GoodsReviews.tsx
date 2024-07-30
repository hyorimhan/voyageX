'use client';

import StarFalseIcon24px from '@/components/common/icons/24px/StarFalseIcon24px';
import StarTrueIcon24px from '@/components/common/icons/24px/StarTrueIcon24px';
import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';

type Review = {
  id: string;
  user_id: string;
  rating: number;
  review: string;
  created_at: string;
  users: { email: string } | null;
};

const GoodsReviews = ({ goodsId }: { goodsId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('goods_reviews')
          .select('*, users(email)')
          .eq('goods_id', goodsId);

        if (error) {
          setIsError(true);
          console.error('Error fetching reviews:', error.message);
        } else {
          setReviews(data);
        }
      } catch (error) {
        setIsError(true);
        console.error('Unexpected error fetching reviews:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [goodsId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <>
      <div className='flex py-7 w-full flex-col mt-11 text-xs mb-[148px] px-16'>
        <p className='text-2xl'>리뷰 ({reviews.length})</p>
        {reviews.map((review) => (
          <div key={review.id} className='flex py-7'>
            <div className='mr-6'>
              <p className='flex mb-3'>
                {Array.from({ length: Math.floor(review.rating) }).map(
                  (_, index) => (
                    <StarTrueIcon24px key={index} />
                  ),
                )}
                {Array.from({ length: 5 - Math.floor(review.rating) }).map(
                  (_, index) => (
                    <StarFalseIcon24px key={index} />
                  ),
                )}
              </p>
              <p>{review.users?.email.split('@')[0]}</p>
            </div>
            <div>
              <p className='text-sm'>{review.review}</p>
            </div>
            <div className='ml-auto'>
              <p>
                {new Date(review.created_at)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\./g, '')
                  .replace(/ /g, '. ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GoodsReviews;
