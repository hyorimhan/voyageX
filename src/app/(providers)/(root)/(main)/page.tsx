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

// TODO localhost:3000   페이지에서 tourID 를 받아올 방법이 없어요.
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

  // TODO 굳이 tourID 를 통해 행성 정보를 다 가지고 오려고 하지 마시고! tourList 를 그냥 가지고 올 수 있는 api 를 이용해 주세요!
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
        <div className='absolute top-32 left-4 sm:top-44 sm:left-16 text-white font-yangpyeong text-2xl sm:text-4xl font-bold fade-text'>
          Let&apos;s Find Popular Planets!
        </div>
        <div className='scroll-container h-full w-full relative flex items-center justify-center'>
          <button
            onClick={handlePrevSlide}
            className='absolute left-2 sm:left-4 z-10 p-2 bg-white rounded-full'
          >
            ←
          </button>
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
            className='absolute right-2 sm:right-4 z-10 p-2 bg-white rounded-full'
          >
            →
          </button>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[2] = el as HTMLDivElement;
        }}
        className='section section-bg h-screen flex flex-col items-center justify-center'
      >
        <h1 className='text-4xl font-bold mb-8 absolute top-8 left-50'>
          Goods Item
        </h1>
        <Link href='/shop'>
          <p className='absolute top-8 right-44 underline'>More+</p>
        </Link>
        {goodsError && <p className='text-red-500'>{goodsError.message}</p>}
        {goodsLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {goods?.map((item) => (
              <div key={item.id} className='p-4 rounded shadow'>
                <Image
                  src={item.goods_img}
                  alt={item.goods_name}
                  width={300}
                  height={300}
                  className='object-cover bg-white-600'
                />
                <h2 className='text-xl font-semibold mt-4'>
                  {item.goods_name}
                </h2>
                <p className='text-sm'>{item.goods_price}원</p>
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
        <h1>5번째 섹션입니다</h1>
      </section>
      <Footer />
    </div>
  );
};

export default MainPage;
