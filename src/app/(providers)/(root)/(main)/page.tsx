'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useFetchGoods from '@/hooks/useFetchGoods';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import useFetchTourDetail from '@/hooks/useFetchTourDetail';
import TopPostsSection from '@/components/main/TopPostsSection';

gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const planetsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { goods, loading, error } = useFetchGoods();
  const {
    planets,
    loading: planetsLoading,
    error: planetsError,
  } = useFetchTourDetail();

  const visiblePlanetsCount = 3; // 처음에 보일 행성 수

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % planets.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + planets.length) % planets.length);
  };

  // 비디오 로드 확인
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const checkVideoLoaded = () => {
        if (videoElement.readyState >= 3) {
          setVideoLoaded(true);
        }
      };
      checkVideoLoaded();
    }
  }, []);

  // 비디오 로드 후 섹션에 ScrollTrigger로 설정
  useEffect(() => {
    if (videoLoaded) {
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
          });

          // 각 섹션의 텍스트가 점점 투명해지는 애니메이션
          if (textRefs.current[index]) {
            gsap.fromTo(
              textRefs.current[index],
              { opacity: 1, y: 0 },
              {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                  trigger: section,
                  start: 'top+=100% center', // 텍스트가 사라지기 시작하는 지점 조정
                  end: 'bottom top', // 텍스트가 완전히 사라지는 지점 조정
                  scrub: true,
                  onUpdate: (self) => {
                    if (self.progress < 0.1) {
                      gsap.to(textRefs.current[index], { opacity: 1, y: 0 });
                    }
                  },
                },
              },
            );
          }
        }
      });
      ScrollTrigger.refresh();
    }
  }, [videoLoaded]);

  // 슬라이드 행성 애니메이션
  useEffect(() => {
    const animatePlanets = () => {
      const radius = 500; // 고리 반경
      const angleStep = (2 * Math.PI) / planets.length; // 각 행성 사이의 각도

      planetsRef.current.forEach((planetElement, index) => {
        if (planetElement) {
          const adjustedIndex =
            (index + (planets.length - Math.floor(visiblePlanetsCount / 2))) %
            planets.length;
          const angle = (adjustedIndex - currentSlide) * angleStep; // 각 행성의 위치 계산
          const xPos = radius * Math.sin(angle); // x 좌표
          const yPos = 0; // y 좌표
          const zPos = radius * Math.cos(angle); // z 좌표
          const isVisible =
            (index >= currentSlide &&
              index < currentSlide + visiblePlanetsCount) || // visiblePlanetsCount 개수만큼 행성이 보이도록 조건식
            (index < currentSlide &&
              index + planets.length < currentSlide + visiblePlanetsCount);
          const isActive =
            index ===
            (currentSlide + Math.floor(visiblePlanetsCount / 2)) %
              planets.length;
          const scale = isActive ? 2 : 1;
          const zIndex = isActive ? 10 : 0;
          const opacity = isVisible ? (isActive ? 1 : 0.5) : 0;

          gsap.to(planetElement, {
            x: xPos,
            y: yPos,
            z: zPos,
            scale: scale,
            zIndex: zIndex,
            opacity: opacity,
            duration: 1,
            ease: 'power2.inOut',
          });

          // 디버깅을 위한 로그 추가
          const planet = planets[index]; // planets 배열의 요소 가져오기
          const tourPrice: number | undefined = planet.price;
          console.log(`Planet ${planet.id} - Price: ${tourPrice}`);
        }
      });
    };

    if (videoLoaded && planets.length > 0) {
      animatePlanets();
    }
  }, [currentSlide, videoLoaded, planets]);

  console.log('Planets:', planets);

  return (
    <div className='w-full'>
      <section
        ref={(el) => {
          sectionsRef.current[0] = el as HTMLDivElement;
        }}
        className='section h-screen flex items-center justify-center relative'
      >
        <video
          ref={videoRef}
          className='absolute top-0 left-0 w-full h-full object-cover z-0'
          src='/videos/우주.mp4'
          autoPlay
          loop
          muted
        />
        <div
          ref={(el) => {
            textRefs.current[0] = el as HTMLDivElement;
          }}
          className='absolute z-10 text-center top-48 sm:w-auto sm:text-left sm:left-48 md:left-40 lg:left-52 xl:left-64'
        >
          <h1 className='text-gradient text-6xl font-bold font-yangpyeong'>
            Voyage X
          </h1>
          <p className='text-white p-4 text-3xl'>
            상상을 현실로, 우주에서의 만남
          </p>
          <p className='text-white p-4'>
            우주 여행의 문을 여는 창구, Voyage X입니다.
            <br />
            상상으로 꿈꾸던 우주 여행을 현실로 만들어 드립니다.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[1] = el as HTMLDivElement;
        }}
        className='section h-screen flex flex-col items-center justify-center relative bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: 'url(/images/section2.png)' }}
      >
        <div
          ref={(el) => {
            textRefs.current[1] = el;
          }}
          className='absolute top-32 left-4 sm:top-44 sm:left-16 text-white font-yangpyeong text-2xl sm:text-4xl font-bold fade-text'
        >
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
                    layout='fill'
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
        <h1 className='text-4xl font-bold mb-8 absolute top-44 left-12'>
          Goods Item
        </h1>
        <Link href='/shop'>
          <p className='absolute top-44 right-24 underline'>More+</p>
        </Link>
        {error && <p className='text-red-500'>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {goods.map((item) => (
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
