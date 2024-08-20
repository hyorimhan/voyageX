'use client';

import RenderTabReviews from './RenderTabReviews';
import RenderTabGoodsDetail from './RenderTabGoodsDetail';
import { useState } from 'react';
import RenderTourGuid from '@/components/tour/tourDetail/tourTab/guideContents/RenderTourGuid';
import { Review } from '@/types/reviewType';

type GoodsDetailPageTabSelectorProps = {
  goodsRating: number | undefined;
  goodsReviews: Review[];
  contents: React.ReactNode | string;
  guideContents?: string | React.ReactNode;
  showTourGuideTab?: boolean;
  defaultTab?: 'Details' | 'Reviews' | 'TourGuide';
};

function GoodsDetailPageTabSelector({
  goodsRating,
  goodsReviews,
  contents,
  guideContents,
  showTourGuideTab = false,
  defaultTab = 'Details',
}: GoodsDetailPageTabSelectorProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <>
      <div className='flex flex-col w-full mb-8 mt-[92px]'>
        <div className='flex'>
          <button
            onClick={() => setSelectedTab('Details')}
            className='text-lg w-full'
          >
            상세정보
          </button>
          {showTourGuideTab && (
            <button
              onClick={() => setSelectedTab('TourGuide')}
              className='text-lg w-full'
            >
              안내사항
            </button>
          )}
          <button
            onClick={() => setSelectedTab('Reviews')}
            className='text-lg w-full'
          >
            <div className='flex items-center justify-center gap-[9px]'>
              <p>리뷰</p>
              <p>{goodsReviews.length}</p>
            </div>
          </button>
        </div>
        <div className='flex w-full mt-[9px]'>
          <div
            className={`flex ${showTourGuideTab ? 'w-1/3' : 'w-1/2'}  ${
              selectedTab === 'Details'
                ? 'border-b-2 border-white'
                : 'border-b-[1px]'
            }`}
          ></div>
          {showTourGuideTab && (
            <div
              className={`flex w-1/3  ${
                selectedTab === 'TourGuide'
                  ? 'border-b-2 border-white'
                  : 'border-b-[1px]'
              }`}
            ></div>
          )}
          <div
            className={` flex ${showTourGuideTab ? 'w-1/3' : 'w-1/2'} ${
              selectedTab === 'Reviews'
                ? 'border-b-2 border-white'
                : 'border-b-[1px]'
            }`}
          ></div>
        </div>
      </div>
      {selectedTab === 'Reviews' ? (
        <RenderTabReviews
          goodsRating={goodsRating}
          goodsReviews={goodsReviews}
        />
      ) : selectedTab === 'TourGuide' && showTourGuideTab ? (
        <RenderTourGuid contents={guideContents} />
      ) : (
        <RenderTabGoodsDetail contents={contents} />
      )}
    </>
  );
}

export default GoodsDetailPageTabSelector;
