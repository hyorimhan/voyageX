'use client';

import StarFalseIcon24px from '@/components/common/icons/24px/StarFalseIcon24px';
import StarTrueIcon24px from '@/components/common/icons/24px/StarTrueIcon24px';
import Loading from '@/components/common/Loading';
import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';

type Review = {
  id: string;
  user_id: string;
  rating: number;
  review: string;
  created_at: string;
  user: { email: string };
};

const GoodsReviews = ({ goodsId }: { goodsId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const supabase = createClient();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('goods_reviews')
          .select('*, user:users(email)')
          .eq('goods_id', goodsId);

        if (error) {
          setIsError(true);
        } else {
          setReviews(data as Review[]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [goodsId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastReview = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  if (isLoading) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  return (
    <>
      <div className='flex py-7 w-full flex-col mt-11 text-xs mb-[148px]'>
        <p className='text-2xl'>리뷰 ({reviews.length})</p>
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <div
              key={review.id}
              className='flex py-7 border-b-[1px] border-black-700 text-black-50'
            >
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
                <p>{review.user?.email.split('@')[0]}</p>
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
          ))
        ) : (
          <div className='p-4 text-center text-gray-500'>
            작성된 글이 없습니다.
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default GoodsReviews;
