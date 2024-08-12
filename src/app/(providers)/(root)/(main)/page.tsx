'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchGoods from '@/hooks/useFetchGoods';
import Footer from '@/components/common/Footer';
import TopPostsSection from '@/components/main/TopPostsSection';
import useScrollTrigger from '@/hooks/useScrollTrigger';
import useSlideAnimation from '@/hooks/useSlideAnimation';
import VideoSection from '@/components/main/VideoSection';
import { Planet } from '@/services/tour';
import { useQuery } from '@tanstack/react-query';
import { getPlanetsList } from '@/services/plants';
import Loading from '@/components/common/Loading';
import Chatbot from '@/components/chatbot/Chatbot';
import { orbitron } from '../../../../../public/fonts/orbitron';

const MainPage = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const planetsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const {
    data: goods,
    isLoading: goodsLoading,
    error: goodsError,
  } = useFetchGoods();

  const {
    data: planetsData,
    isLoading: tourLoading,
    error: tourError,
  } = useQuery({
    queryKey: ['getPlanets'],
    queryFn: getPlanetsList,
    staleTime: 1000000,
  });

  const planets: Planet[] = planetsData || [];

  const visiblePlanetsCount = 3; // 처음에 보일 행성 수

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % planets.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + planets.length) % planets.length);
  };

  // 비디오 로드 확인
  useScrollTrigger(videoLoaded, sectionsRef);

  // 슬라이드 행성 애니메이션
  useSlideAnimation(
    videoLoaded,
    planets,
    currentSlide,
    visiblePlanetsCount,
    planetsRef,
  );

  if (tourLoading) return <Loading />;
  if (tourError) return <div>Error: {tourError.message}</div>;

  return (
    <div>
      <Chatbot />
      <VideoSection
        videoSrc='/videos/main.mp4'
        heading='Voyage X'
        subHeading='상상을 현실로, 우주에서의 만남'
        sectionRef={{ current: sectionsRef.current[0] }} // sectionRef 타입 맞추기 위해 명시적 지정
        setVideoLoaded={setVideoLoaded}
      />

      <section
        ref={(el) => {
          sectionsRef.current[1] = el as HTMLDivElement;
        }}
        className='section h-screen flex flex-col items-center justify-center relative bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: 'url(/images/section2.png)' }}
      >
        <p
          className={`absolute top-32 left-4 sm:top-44 sm:left-16 text-white text-4xl sm:text-4xl font-semibold fade-text ${orbitron.className}`}
        >
          Let's Find Popular Planets!
        </p>
        <Link href='/tour'>
          <p className='absolute top-36 right-20 z-10'>
            MORE+
          </p>
        </Link>
        <div className='scroll-container h-full w-full relative flex items-center justify-center'>
          <button
            onClick={handlePrevSlide}
            className='swiper-button-prev text-2xl rounded-full absolute left-2 sm:left-4 z-10 p-2'
          ></button>
          <div className='slider-container relative flex items-center justify-center'>
            {planets.map((planet, index) => {
              const isVisible =
                (index >= currentSlide &&
                  index < currentSlide + visiblePlanetsCount) ||
                (index < currentSlide &&
                  index + planets.length < currentSlide + visiblePlanetsCount);

              const adjustedIndex =
                (index +
                  (planets.length - Math.floor(visiblePlanetsCount / 2))) %
                planets.length;

              const isActive =
                index ===
                (currentSlide + Math.floor(visiblePlanetsCount / 2)) %
                  planets.length;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    planetsRef.current[index] = el as HTMLDivElement;
                  }}
                  data-id={planet.id}
                  className={`absolute w-20 h-20 sm:w-24 sm:h-24 transform-gpu transition-opacity duration-500 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transform: `translate3d(${
                      150 *
                      Math.sin(
                        ((adjustedIndex - currentSlide) * (2 * Math.PI)) /
                          planets.length,
                      )
                    }px, 0, ${
                      150 *
                      Math.cos(
                        ((adjustedIndex - currentSlide) * (2 * Math.PI)) /
                          planets.length,
                      )
                    }px) scale(${isActive ? 1.5 : 1})`,
                    zIndex: isActive ? 10 : 0,
                    opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                  }}
                >
                  <Image
                    src={planet.planet_img}
                    alt={`Planet ${index + 1}`}
                    fill
                    sizes='100vw'
                    objectFit='contain'
                  />
                  {isActive && (
                    <div className='text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-max'>
                      <p>{planet.name}</p>
                      <p>
                        {planet.price
                          ? `₩${planet.price.toLocaleString()}`
                          : 'Price Does Not Exist'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleNextSlide}
            className='swiper-button-next rounded-full text-2xl absolute right-2 sm:right-4 z-10'
          ></button>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[2] = el as HTMLDivElement;
        }}
        className='section section-bg h-screen flex flex-col items-center justify-center'
      >
        <h1
          className={`text-4xl absolute font-bold top-48 left-24 ${orbitron.className}`}
        >
          GOODS SHOP
        </h1>
        <Link href='/shop'>
          <p className='absolute top-48 right-20 underline'>MORE+</p>
        </Link>
        {goodsError && <p className='text-red-500'>{goodsError.message}</p>}
        {goodsLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {goods?.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className='p-4 rounded shadow border border-white'
              >
                <Image
                  src={item.goods_img}
                  alt={item.goods_name}
                  width={300}
                  height={300}
                  className='object-cover'
                />
                <div className='mt-4'>
                  <h2 className='text-xl font-semibold text-white'>
                    {item.goods_name}
                  </h2>
                  <p className='text-sm'>
                    <span className='text-red-500'>{item.discount}%</span>{' '}
                    <span className='text-white'>{item.goods_price}원</span>
                  </p>
                  <div className='flex items-center justify-between mt-2'>
                    <span className='flex items-center'>
                      <Image
                        src='/icons/20px/star_true.svg'
                        alt='star icon'
                        width={16}
                        height={16}
                        className='mr-1'
                      />
                      {item.rating_avg}
                    </span>
                    <span className='flex items-center'>
                      <Image
                        src='/icons/20px/heart_default.svg'
                        alt='heart icon'
                        width={16}
                        height={16}
                        className='mr-1'
                      />
                      {item.like_count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[3] = el as HTMLDivElement;
        }}
        className='section section-bg h-screen flex items-center justify-center'
      >
        <TopPostsSection />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[4] = el as HTMLDivElement;
        }}
        className='section h-screen flex items-center justify-center'
        style={{
          backgroundImage: "url('/images/section5-bg.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <h1>컨텐츠 준비 중입니다…</h1>
      </section>
      <Footer />
    </div>
  );
};

export default MainPage;
