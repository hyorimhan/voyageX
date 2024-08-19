import StarFalseIcon24px from '@/components/common/icons/24px/StarFalseIcon24px';
import StarTrueIcon24px from '@/components/common/icons/24px/StarTrueIcon24px';
import GoodsReviews from './GoodsReviews';
import { Review } from '@/types/reviewType';
import GoodsReviewsMobile from './GoodsReviewsMobile';

type RenderTabReviewsProps = {
  goodsRating: number | undefined;
  goodsReviews: Review[];
};

const RenderTabReviews = ({
  goodsRating,
  goodsReviews,
}: RenderTabReviewsProps) => {
  const roundedStars = Math.round(goodsRating ?? 0);
  const fullStars = roundedStars;
  const emptyStars = 5 - roundedStars;

  return (
    <>
      <div className='mt-[54px] flex flex-row items-center justify-center'>
        <div className='flex mr-4'>
          {Array.from({ length: fullStars }).map((_, index) => (
            <StarTrueIcon24px key={index} />
          ))}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <StarFalseIcon24px key={index} />
          ))}
        </div>
        <div className='flex items-end gap-1'>
          <p className='text-4xl font-bold'>{goodsRating?.toFixed(1)}</p>
          <p className='text-2xl text-black-400 ml-1 font-bold'>/5.0</p>
        </div>
      </div>
      <div className='sm:hidden'>
        <GoodsReviews goodsReviews={goodsReviews} />
      </div>
      <div className='md:hidden lg:hidden'>
        <GoodsReviewsMobile goodsReviews={goodsReviews} />
      </div>
    </>
  );
};

export default RenderTabReviews;
