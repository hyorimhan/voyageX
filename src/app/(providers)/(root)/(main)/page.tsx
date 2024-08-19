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
        videoSrc='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/mainvideo%20(2).mp4?t=2024-08-16T07%3A58%3A43.247Z'
        heading='Voyage X'
        subHeading='상상을 현실로, 우주에서의 만남'
        sectionRef={{ current: sectionsRef.current[0] }} // sectionRef 타입 맞추기 위해 명시적 지정
        setVideoLoaded={setVideoLoaded}
        source={
          <Link
            href={
              'https://kr.freepik.com/free-video/traveling-through-star-fields-space-distant-galaxy-2_179468#fromView=search&page=1&position=0&uuid=4946a633-a12e-4230-a49f-07ec1569be25'
            }
          >
            Designed by Freepik
          </Link>
        }
      />

<section
  ref={(el) => {
    sectionsRef.current[1] = el as HTMLDivElement;
  }}
  className='section h-screen flex flex-col items-center justify-center relative bg-center bg-cover bg-no-repeat transition-opacity duration-500 opacity-100'
  style={{
    backgroundImage: 'url(/images/section2_bg.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <p
    className={`absolute top-40 left-20 text-white text-4xl font-semibold fade-text ${orbitron.className} sm:text-2xl sm:font-medium sm:top-24 sm:left-8`}
  >
    <span className='hidden sm:inline'>
      Let&apos;s Find <br className='sm:block hidden' /> Popular Planets!
    </span>
    <span className='sm:hidden'>Let&apos;s Find Popular Planets!</span>
  </p>

  <Link href='/tour'>
    <p className='absolute top-36 right-20 sm:right-6 z-10 sm:text-xs sm:top-36 text-lg font-normal underline'>
      MORE+
    </p>
  </Link>

  <div className='scroll-container h-full w-full relative flex items-center justify-center'>
    <button
      onClick={handlePrevSlide}
      className='absolute left-52 sm:left-6 z-10 p-2 top-1/2 -translate-y-1/2'
      style={{
        background: "url('/images/left.png') no-repeat center",
        width: '48px',
        height: '48px',
        backgroundSize: 'contain',
      }}
    ></button>
    <div className='slider-container relative flex items-center justify-center'>
      {planets.map((planet, index) => {
        const totalPlanets = planets.length;
        const angle = (index / totalPlanets) * 2 * Math.PI;

        const xPos = 150 * Math.cos(angle);
        const yPos = 0;
        const zPos = 150 * Math.sin(angle);

        const isVisible =
          (index >= currentSlide &&
            index < currentSlide + visiblePlanetsCount) ||
          (index < currentSlide &&
            index + planets.length < currentSlide + visiblePlanetsCount);

        const isActive =
          index ===
          (currentSlide + Math.floor(visiblePlanetsCount / 2)) %
            planets.length;

        return (
          <Link href={`/tour/${planet.id}`} key={index} passHref>
            <div
              key={index}
              ref={(el) => {
                planetsRef.current[index] = el as HTMLDivElement;
              }}
              data-id={planet.id}
              className={`absolute w-32 h-32 sm:w-24 sm:h-24 transform-gpu transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translate3d(${xPos}px, ${yPos}px, ${zPos}px) scale(${
                  isActive ? 1.5 : 1
                })`,
                transformOrigin: 'center center',
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
          </Link>
        );
      })}
    </div>
    <button
      onClick={handleNextSlide}
      className='absolute right-44 sm:right-6 z-10 p-2 top-1/2 -translate-y-1/2'
      style={{
        background: "url('/images/right.png') no-repeat center",
        width: '48px',
        height: '48px',
        backgroundSize: 'contain',
      }}
    ></button>
  </div>
</section>

      <section
        ref={(el) => {
          sectionsRef.current[2] = el as HTMLDivElement;
        }}
        className='section section-bg h-screen flex flex-col items-center justify-center transition-opacity duration-500'
      >
        <h1
          className={`text-4xl absolute font-semibold top-40 left-20 ${
            orbitron.className
          } transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }
    sm:text-2xl sm:font-medium sm:top-16 sm:left-4`}
        >
          GOODS SHOP
        </h1>
        <Link href='/shop'>
          <p
            className={`absolute top-48 right-20 underline transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            } sm:top-16 sm:right-4`}
          >
            MORE+
          </p>
        </Link>

        {goodsError && <p className='text-red-500'>{goodsError.message}</p>}
        {goodsLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <ul className='grid grid-cols-3 gap-4 p-4 sm:grid-cols-2 sm:gap-2'>
            {goods?.slice(0, 4).map((item, index) => (
              <li
                key={item.id}
                className={`p-4 rounded shadow ${
                  index < 1 && 'hidden sm:block'
                } sm:w-full sm:h-auto list-none`}
              >
                <Link href={`shop_detail/${item.id}`} className='flex flex-col'>
                  <div className=''>
                    <Image
                      src={item.goods_img}
                      alt={item.goods_name}
                      width={320}
                      height={360}
                      className='object-cover w-full h-72 sm:h-32'
                    />
                    <div className='mt-4 sm:mt-2'>
                      <p className='bg-black-600 text-black-50 text-xs px-2 py-1 rounded-full mb-2 inline-block'>
                        무료 배송
                      </p>
                      <h2 className='text-base sm:text-xs font-medium text-white break-words'>
                        {item.goods_name}
                      </h2>
                      <p className='text-black-200 line-through sm:text-xs'>
                        {item.pre_price.toLocaleString()}원
                      </p>
                      <p className='text-sm sm:text-base sm:font-semibold'>
                        <span className='text-red-500 text-xl'>
                          {item.discount}%
                        </span>{' '}
                        <span className='text-white text-xl'>
                          {item.goods_price.toLocaleString()}원
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-2'>
                    <span className='flex items-center'>
                      <Image
                        src='/icons/20px/star_true.svg'
                        alt='star icon'
                        width={16}
                        height={16}
                        className='mr-1'
                      />
                      {Number(item.rating_avg).toFixed(1)}
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[3] = el as HTMLDivElement;
        }}
        className='section section-bg h-screen flex flex-col items-center justify-center'
      >
        <TopPostsSection />
        {/* <div>
          <Footer />
        </div> */}
      </section>
      <Footer />
    </div>
  );
};

export default MainPage;
