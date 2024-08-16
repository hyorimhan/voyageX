'use client';

import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Stars from '@/components/shop/Stars';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTourListByOrder } from '@/services/tour';
import { TopRatedTours } from '@/types/tour';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import TourSmallHearts from './TourSmallHearts';

const RecommendTourList = () => {
  const user = useAuthStore((state) => state.user);
  const { data: hotTours } = useQuery<TopRatedTours[]>({
    queryKey: ['tours', 'rating'],
    queryFn: getTourListByOrder,
  });
  const router = useRouter();

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  const handleItemClick = (id: string) => {
    router.push(`/tour/${id}`);
  };

  const breakpoints = {
    375: {
      slidesPerView: 2,
    },
    1120: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  };

  return (
    <>
      <p className='text-xl font-semibold'>추천 여행상품</p>
      <Swiper
        modules={[Navigation, Pagination]}
        breakpoints={breakpoints}
        className='flex w-[836px] sm:w-[408px]'
      >
        {hotTours?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='my-4'>
              <div className='relative'>
                <Image
                  src={item.planets.planet_img}
                  alt={item.planets.description}
                  width={194}
                  height={194}
                  className='rounded-lg cursor-pointer h-[194px] w-[194px] p-4 border-[2px] border-black-600 bg-transparent'
                  onClick={() => handleItemClick(item.id)}
                />
              </div>
              <div className='bg-white rounded-xl text-xs py-1 px-2 w-min flex text-nowrap mt-3 mb-[6px] text-black-700'>
                HOT
              </div>
              <div className='ml-1 flex flex-col'>
                <p
                  className='flex justify-start cursor-pointer text-sm'
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.planets.name} 6박 7일 패키지
                </p>
                <div className='flex justify-between items-end text-lg'>
                  <div className='flex flex-col'>
                    <div className='flex'>
                      {/* <p className='text-error-900 mr-2 font-semibold'>10%</p> */}
                      <p className='font-semibold'>{`${item.price.toLocaleString()}원`}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <Stars ratingAvg={item.rating_avg} />
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <TourSmallHearts tour_id={item.id} user_id={user.id} />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RecommendTourList;
