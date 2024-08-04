'use client';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import QuantityBtn from '@/components/shop/detail/QuantityBtn';
import { Tour } from '@/types/tourPropsType';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import TourHearts from './TourHearts';
import TourGuideSWiper from './TourGuideSWiper';
import { orbitron } from '../../../../public/fonts/orbitron';

function DetailCard({ tour }: { tour: Tour }) {
  const user = useAuthStore((state) => state.user);

  const contents = (
    <div>
      <div className='mt-12 text-2xl font-semibold'>
        {tour.planets?.name} 여행 패키지 일정
      </div>
      <div className='mt-6 font-medium'>{tour.planets?.title}</div>
      <div className='mt-6 font-medium'>{tour.planets?.description}</div>
      <div className='flex flex-col gap-4 '>
        <TourGuideSWiper />
      </div>
    </div>
  );

  return (
    <>
      <div
        className={` mb-14 mt-[132px] ${orbitron.className} font-semibold text-[28px]`}
      >
        Travel Package
      </div>
      <div className='flex'>
        <div className='flex w-[500px] h-[500px]'>
          <Image
            src={tour.planets?.planet_img!}
            alt={tour.planets?.name!}
            width={500}
            height={500}
            className='m-6 '
          />
        </div>
        <div className='w-[556px] h-[552px] ml-16'>
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
            <div className=' border-b my-3  pb-3 '>우주선 명 스타라이저</div>
            <div className=' border-b my-3  pb-3'>수량 1개 (1인 1개 한정)</div>
          </div>
          <QuantityBtn tourPrice={tour.price} />
          <div className='flex items-center gap-4'>
            {user && (
              <div className=' w-[53px] h-[53px] flex p-2 rounded-lg items-center border-2 justify-center border-solid border-primary-400 mt-8'>
                <TourHearts tour_id={tour.id} user_id={user.id} />
              </div>
            )}
            <Link href={`/tour/payment/${tour.id}`}>
              <div className='h-[60px] w-[487px] bg-primary-600 rounded-lg justify-center flex items-center mt-8 font-semibold'>
                구매하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <GoodsDetailPageTabSelector
          goodsRating={tour?.rating_avg}
          goodsId={tour.id}
          contents={contents}
        />
      </div>
    </>
  );
}

export default DetailCard;
