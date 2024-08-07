'use client';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import QuantityBtn from '@/components/shop/detail/QuantityBtn';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import TourHearts from './TourHearts';
import { orbitron } from '../../../../public/fonts/orbitron';
import { Tour } from '@/types/tourPropsType';
import TourContents from './tourTab/tourContents/TourContents';
import GuideContents from './tourTab/guideContents/GuideContents';

function DetailCard({ tour }: { tour: Tour }) {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div
        className={` mb-14 mt-[132px] sm:ml-5 md:ml-5 ${orbitron.className} font-semibold text-[28px]`}
      >
        Travel Package
      </div>
      <div className='grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1'>
        <div className='sm:mx-[47.5px]'>
          <Image
            src={tour.planets?.planet_img!}
            alt={tour.planets?.name!}
            width={500}
            height={500}
            className='md:mx-auto sm:mx-auto
            '
          />
        </div>
        <div className='sm:mx-5 md:mx-5'>
          <div className='text-2xl mb-4 font-semibold'>
            <span className='mr-3'>{tour.planets?.name}</span>
            <span className='text-black-700'>{tour.planets?.english_name}</span>
          </div>
          <div></div>
          <div className='text-sm mb-8 font-medium'>{tour.tag}</div>
          <div className='text-lg mb-[12px] font-semibold'>6박 7일 패키지</div>
          <div className='text-2xl mb-[32px] font-medium'>
            {tour.price?.toLocaleString()}원
          </div>
          <div className='text-[14px] border-t font-medium '>
            <div className=' border-b my-3  pb-3'>출발확정 2025.10.10</div>
            <div className=' border-b my-3  pb-3'>
              여행기간 2025.10.10 ~2025.10.20
            </div>
            <div className=' border-b my-3  pb-3 '>
              우주선 명 {tour.spaceship}
            </div>
            <div className=' border-b my-3  pb-3'>수량 1개 (1인 1개 한정)</div>
          </div>
          <QuantityBtn tourPrice={tour.price} />

          <div className='flex items-center gap-4'>
            <div className=' w-[53px] h-[53px] flex p-2 rounded-lg items-center border-2 justify-center border-solid border-primary-400 mt-8'>
              <TourHearts tour_id={tour.id} user_id={user?.id} />
            </div>
            <Link href={`/tour/payment/${tour.id}`} className='flex-grow'>
              <div className='h-[60px]  bg-primary-600 rounded-lg justify-center flex items-center mt-8 font-semibold'>
                구매하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='md:mx-5 sm:mx-5'>
        <GoodsDetailPageTabSelector
          goodsRating={tour?.rating_avg}
          goodsId={tour.id}
          contents={<TourContents tour={tour} />}
          showTourGuideTab={true}
          guideContents={<GuideContents />}
        />
      </div>
    </>
  );
}

export default DetailCard;
