'use client';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import QuantityBtn from '@/components/shop/detail/QuantityBtn';
import { Tour } from '@/types/tourPropsType';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import TourHearts from './TourHearts';
import { useState } from 'react';

function DetailCard({ tour }: { tour: Tour }) {
  const user = useAuthStore((state) => state.user);

  const contents = (
    <div>
      <div className='mt-12 text-2xl'>{tour.planets.name} 여행 패키지 일정</div>
      <div className='mt-6'>{tour.planets.title}</div>
      <div className='mt-6'>{tour.planets.description}</div>
    </div>
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://i.ibb.co/ccph7F5/image.gif',
    'https://i.ibb.co/1s0pwfV/1.jpg',
    'https://i.ibb.co/w03crjt/2.jpg',
    'https://i.ibb.co/68Xxfrs/3.jpg',
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  return (
    <>
      <div className='  mt-40 flex '>
        <div className='flex w-[500px] h-[500px]'>
          <Image
            src={tour.planets.planet_img}
            alt={tour.planets.name!}
            width={500}
            height={500}
            className='m-6 '
          />
        </div>
        <div className='w-[556px] h-[552px] ml-16'>
          <div className='text-2xl mb-4'>
            {tour.planets.name} {tour.planets.english_name}
          </div>
          <div></div>
          <div className='text-sm mb-8'>{tour.tag}</div>
          <div className='text-lg mb-[12px]'>6박 7일 패키지</div>
          <div className='text-2xl mb-[32px]'>
            {tour.price?.toLocaleString()}원
          </div>
          <div className='text-[14px] border-t '>
            <div className=' border-b my-3  pb-3'>출발확정 2025.10.10</div>
            <div className=' border-b my-3  pb-3'>
              여행기간 2025.10.10 ~2025.10.20
            </div>
            <div className=' border-b my-3  pb-3 '>우주선 명 스타라이저</div>
            <div className=' border-b my-3  pb-3'>티켓 배송비 3000원</div>
          </div>
          <QuantityBtn goodsPrice={tour.price} />
          <div className='flex items-center gap-4'>
            {user && (
              <div className=' w-[53px] h-[53px] flex p-2 rounded-lg items-center border-2 border-solid border-primary-400 mt-8'>
                <TourHearts tour_id={tour.id} user_id={user.id} />
              </div>
            )}
            <Link href={`/tour/payment/${tour.id}`}>
              <div className='h-[60px] w-[487px] bg-primary-600 rounded-lg justify-center flex items-center mt-8'>
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

      {/* <div className='w-[1120px] flex justify-center'>
        <div className='flex flex-col gap-4 '>
          <Image
            src={'https://i.ibb.co/ccph7F5/image.gif'}
            alt='guide'
            width={700}
            height={500}
          />
          <Image
            src={'https://i.ibb.co/1s0pwfV/1.jpg'}
            alt='guide'
            width={700}
            height={500}
          />
          <Image
            src={'https://i.ibb.co/w03crjt/2.jpg'}
            alt='guide'
            width={700}
            height={500}
          />
          <Image
            src={'https://i.ibb.co/68Xxfrs/3.jpg'}
            alt='guide'
            width={700}
            height={500}
          />
        </div>
      </div> */}
      <div className='relative w-full max-w-[1120px] mx-auto overflow-hidden ml-[10%] '>
        <div
          className='flex transition-transform duration-500 '
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className='w-full flex-shrink-0'>
              <Image
                src={slide}
                alt={`Slide ${index}`}
                width={900}
                height={500}
                className='object-cover'
              />
            </div>
          ))}
        </div>
        <button
          className='absolute top-1/2 transform -translate-y-1/2 left-0 bg-black bg-opacity-50 text-white px-4 py-2'
          onClick={handlePrev}
        >
          ❮
        </button>
        <button
          className='absolute top-1/2 transform -translate-y-1/2 right-0 bg-black bg-opacity-50 text-white px-4 py-2'
          onClick={handleNext}
        >
          ❯
        </button>
      </div>
    </>
  );
}

export default DetailCard;
