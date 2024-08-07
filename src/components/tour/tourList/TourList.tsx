'use client';
import TourCard from './TourCard';
import { tourList } from '@/services/tour';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import { orbitron } from '@/../public/fonts/orbitron';
import { Tour } from '@/types/tourPropsType';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

function TourList() {
  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: () => tourList(),
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`text-[28px] mt-32 text-center ${orbitron.className} font-semibold`}
      >
        Travel Package
      </div>
      <div className='lg:hidden md:hidden mx-5'>
        <Swiper
          loop={true}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Autoplay, Pagination]}
        >
          <div>
            {tours?.map((tour) => (
              <SwiperSlide key={tour.id}>
                <TourCard key={tour.id} tour={tour} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      <div className='sm:hidden '>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 p-4 mt-10'>
          {tours?.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TourList;
