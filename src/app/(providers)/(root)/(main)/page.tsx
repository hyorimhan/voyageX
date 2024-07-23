'use client';
import Header from '@/components/common/Header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger); // 플러그인을 gsap에 등록

const MainPage = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]); // 각 섹션 요소 저장할 참조 배열 생성

  useEffect(() => {
    sectionsRef.current.slice(1).forEach((section) => {
      gsap.fromTo(
        // 각 섹션에 애니메이션 설정
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });
  }, []);

  return (
    <div className='w-full'>
      <Header />
      <section
        ref={(el) => {
          sectionsRef.current[0] = el;
        }} // 첫 번째 섹션의 참조를 배열에 저장
        className='section h-screen flex items-center justify-center relative'
      >
        <video
          className='absolute top-0 left-0 w-full h-full object-cover z-0'
          src='/videos/우주.mp4'
          autoPlay
          loop
          muted
        />
        <div className='absolute z-10 text-center top-48 sm:w-auto sm:text-left sm:left-48 md:left-40 lg:left-52 xl:left-64'>
          <h1 className='text-white text-6xl font-bold text-purple-200'>
            Voyage X
          </h1>
          <p className="text-white p-4">안녕하센요</p>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
