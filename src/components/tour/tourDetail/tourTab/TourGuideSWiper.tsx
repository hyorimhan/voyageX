import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

function TourGuideSWiper() {
  const images = [
    'https://i.ibb.co/VjYCQkc/1.gif',
    'https://i.ibb.co/TYj8mTz/2.jpg',
    'https://i.ibb.co/ZXD4Kwh/3.jpg',
    'https://i.ibb.co/m0t7FCV/4.jpg',
  ];
  return (
    <div className='w-[1120px]'>
      <Swiper
        loop={true}
        spaceBetween={30}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Autoplay]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className='flex justify-center items-center'>
            <div className='flex justify-center items-center w-full h-full'>
              <Image
                src={img}
                alt='spaceTourGuide'
                priority
                loading='eager'
                width={800}
                height={500}
                className='object-contain'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TourGuideSWiper;
