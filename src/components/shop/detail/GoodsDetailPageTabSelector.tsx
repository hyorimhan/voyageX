'use client';

import RenderTabReviews from './RenderTabReviews';
import RenderTabGoodsDetail from './RenderTabGoodsDetail';

interface GoodsDetailPageTabSelectorProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

function GoodsDetailPageTabSelector({
  selectedTab,
  setSelectedTab,
}: GoodsDetailPageTabSelectorProps) {
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
          <button
            onClick={() => setSelectedTab('Reviews')}
            className='text-lg w-full'
          >
            리뷰
          </button>
        </div>
        <div className='flex w-full mt-[9px]'>
          <div
            className={`flex w-1/2  ${
              selectedTab === 'Details'
                ? 'border-b-4 border-white'
                : 'border-b-2'
            }`}
          ></div>
          <div
            className={` flex w-1/2 ${
              selectedTab === 'Reviews'
                ? 'border-b-4 border-white'
                : 'border-b-2'
            }`}
          ></div>
        </div>
      </div>
      {selectedTab === 'Reviews' ? (
        <RenderTabReviews />
      ) : (
        <RenderTabGoodsDetail />
      )}
    </>
  );
}

export default GoodsDetailPageTabSelector;
