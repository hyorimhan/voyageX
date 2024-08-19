'use client';

import StarFalseIcon24px from '@/components/common/icons/24px/StarFalseIcon24px';
import StarTrueIcon24px from '@/components/common/icons/24px/StarTrueIcon24px';
import { useState } from 'react';
import Pagination from '@/components/common/Pagination';
import { Review } from '@/types/reviewType';
import StarTrueIcon16px from '@/components/common/icons/16px/StarTrueIcon16px';
import StarFalseIcon16px from '@/components/common/icons/16px/StarFalseIcon16px';

type GoodsReviewsProps = {
  goodsReviews: Review[];
};

const GoodsReviewsMobile = ({ goodsReviews }: GoodsReviewsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastReview = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - ITEMS_PER_PAGE;
  const currentReviews = goodsReviews.slice(
    indexOfFirstReview,
    indexOfLastReview,
  );
  const totalPages = Math.ceil(goodsReviews.length / ITEMS_PER_PAGE);

  return (
    <>
      <div className='flex py-7 w-full flex-col mt-11 text-xs mb-[148px]'>
        <p className='text-2xl'>리뷰 ({goodsReviews.length})</p>
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <div
              key={review.id}
              className='flex flex-col py-7 border-b-[1px] border-black-700 text-black-50'
            >
              <div className='flex items-start'>
                <div className='mr-2'>
                  <p className='flex mb-3'>
                    <div className='flex'>
                      {Array.from({ length: Math.floor(review.rating) }).map(
                        (_, index) => (
                          <StarTrueIcon16px key={index} />
                        ),
                      )}
                    </div>
                    <div className='flex'>
                      {Array.from({
                        length: 5 - Math.floor(review.rating),
                      }).map((_, index) => (
                        <StarFalseIcon16px key={index} />
                      ))}
                    </div>
                  </p>
                </div>
                <p>
                  {review.user?.email.split('@')[0] ??
                    '우주 미아 (탈퇴한 유저)'}
                </p>
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
              <div>
                <p className='text-sm'>{review.review}</p>
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

export default GoodsReviewsMobile;
