'use client';
import Header from '@/components/common/Header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const planetsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const planets = [
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
  ];

  const handleNextSlide = () => { // 다음 슬라이드 핸들
    setCurrentSlide((prev) => (prev + 1) % planets.length);
  };

  const handlePrevSlide = () => { // 이전 슬라이드 핸들
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
      sectionsRef.current.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
          });
        }
      });
      ScrollTrigger.refresh();
    }
  }, [videoLoaded]);

  // 슬라이드 행성 애니메이션
  useEffect(() => {
    const animatePlanets = () => {
      const radiusX = 300; // 타원형 X축 반경
      const radiusY = 150; // 타원형 Y축 반경
      const angleStep = (2 * Math.PI) / planets.length; // 각 행성 사이의 각도
      const offsetAngle = currentSlide * angleStep; // 선택된 행성을 중앙에 두기 위한 오프셋

      planetsRef.current.forEach((planet, index) => {
        if (planet) {
          const angle = index * angleStep - offsetAngle; // 각 행성의 위치 계산
          const xPos = radiusX * Math.sin(angle); // x 좌표
          const yPos = radiusY * Math.cos(angle); // y 좌표
          const isActive = index === currentSlide;
          const scale = isActive ? 1.5 : 1;
          const zIndex = isActive ? 10 : 0;
          const opacity = isActive ? 1 : 0.5;

          gsap.to(planet, {
            x: xPos,
            y: yPos,
            scale: scale,
            zIndex: zIndex,
            opacity: opacity,
            duration: 1,
            ease: 'power2.inOut',
          });
        }
      });
    };

    if (videoLoaded) {
      animatePlanets();
    }
  }, [currentSlide, videoLoaded]);

  return (
    <div className='w-full'>
      <Header />
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
        <div className='absolute z-10 text-center top-48 sm:w-auto sm:text-left sm:left-48 md:left-40 lg:left-52 xl:left-64'>
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
        className='section h-screen flex items-center justify-center relative bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: 'url(/images/section2.png)' }}
      >
        <div className='scroll-container h-full w-full relative flex items-center justify-center'>
          <button
            onClick={handlePrevSlide}
            className='absolute left-4 z-10 p-2 bg-white rounded-full'
          >
            ←
          </button>
          <div className='slider-container relative flex items-center justify-center'>
            {planets.map((planet, index) => (
              <div
                key={index}
                ref={(el) => {
                  planetsRef.current[index] = el as HTMLDivElement;
                }}
                className='absolute w-32 h-32 transform-gpu'
                style={{
                  transform: `translate3d(${300 * Math.sin((index - currentSlide) * (2 * Math.PI) / planets.length)}px, ${200 * Math.cos((index - currentSlide) * (2 * Math.PI) / planets.length)}px, 0)`
                }}
              >
                <Image
                  src={planet}
                  alt={`Planet ${index + 1}`}
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleNextSlide}
            className='absolute right-4 z-10 p-2 bg-white rounded-full'
          >
            →
          </button>
        </div>
        <div className='absolute top-44 left-16 text-white font-yangpyeong text-4xl font-bold'>
          Let's Find Popular Planets!
        </div>
      </section>
    </div>
  );
};

export default MainPage;