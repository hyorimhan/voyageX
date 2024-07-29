import StarFalseIcon24px from '@/components/common/icons/24px/StarFalseIcon24px';
import StarTrueIcon24px from '@/components/common/icons/24px/StarTrueIcon24px';

import React from 'react';

const RenderTabReviews = () => {
  return (
    <>
      <div className='mt-[54px] flex flex-col items-center'>
        <div className='gap-2'>
          <p className='text-2xl'>리뷰 4.0</p>
          <p className='text-xs'>총 12건 리뷰</p>
        </div>
        <div className='flex mt-5'>
          <div className='flex items-center'>
            <StarTrueIcon24px />
            <StarTrueIcon24px />
            <StarTrueIcon24px />
            <StarTrueIcon24px />
            <StarFalseIcon24px />
          </div>
        </div>
      </div>
      <div className='flex py-7 w-full flex-grow mt-11 text-xs mb-[148px] px-16'>
        <div className='mr-6'>
          <p className='flex mb-2'>
            <StarTrueIcon24px />
            <StarTrueIcon24px />
            <StarTrueIcon24px />
            <StarTrueIcon24px />
            <StarFalseIcon24px />
          </p>
          <p>아이디</p>
        </div>
        <div>
          <p className='text-sm'>튼튼하고 목늘어짐 없이 좋아용 추천!</p>
        </div>
        <div className='ml-auto'>
          <p>2024.07.08</p>
        </div>
      </div>
    </>
  );
};

export default RenderTabReviews;
