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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const planets = [
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
    '/images/화성.png',
  ];

  // 다음 슬라이드 
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % planets.length);
  };

  // 이전 슬라이드
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + planets.length) % planets.length);
  };

  // 비디오 로드됐는지 확인
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

  // 비디오 로드 후 섹션을 ScrollTrigger로 설정
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

  // 슬라이드 시 행성 선택 애니메이션
  useEffect(() => {
    planetsRef.current.forEach((planet, index) => {
      if (planet) {
        const isActive = index === currentSlide;
        const xPos = (index - currentSlide) * 300; // 행성 위치
        const scale = isActive ? 1.5 : 1;
        const zIndex = isActive ? 10 : 0; 
        const opacity = isActive ? 1 : 0.5; 

        gsap.to(planet, {
          x: xPos,
          scale: scale,
          zIndex: zIndex,
          opacity: opacity,
          duration: 1,
          ease: 'power2.inOut',
        });
      }
    });
  }, [currentSlide]);

  return (
    <div className="w-full">
      <Header />
      <section
        ref={(el) => { sectionsRef.current[0] = el as HTMLDivElement; }}
        className="section h-screen flex items-center justify-center relative"
      >
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videos/우주.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute z-10 text-center top-48 sm:w-auto sm:text-left sm:left-48 md:left-40 lg:left-52 xl:left-64">
          <h1 className="text-gradient text-6xl font-bold">Voyage X</h1>
          <p className="text-white p-4 text-3xl">상상을 현실로, 우주에서의 만남</p>
          <p className="text-white p-4">
            우주 여행의 문을 여는 창구, Voyage X입니다.
            <br />
            상상으로 꿈꾸던 우주 여행을 현실로 만들어 드립니다.
          </p>
        </div>
      </section>

      <section
        ref={(el) => { sectionsRef.current[1] = el as HTMLDivElement; }}
        className="section h-screen flex items-center justify-center relative bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(/images/section2.png)' }}
      >
        <div className="scroll-container h-full w-full relative flex items-center justify-center">
          <button onClick={handlePrevSlide} className="absolute left-4 z-10 p-2 bg-white rounded-full">←</button>
          <div className="slider-container relative flex items-center justify-center">
            {planets.map((planet, index) => (
              <div
                key={index}
                ref={(el) => { planetsRef.current[index] = el as HTMLDivElement; }}
                className="planet absolute w-80 h-80 flex items-center justify-center"
              >
                <Image src={planet} alt={`Planet ${index + 1}`} layout="fill" objectFit="contain" />
              </div>
            ))}
          </div>
          <button onClick={handleNextSlide} className="absolute right-4 z-10 p-2 bg-white rounded-full">→</button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;