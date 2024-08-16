import React, { useRef, useEffect } from 'react';
import { orbitron } from '../../../public/fonts/orbitron';
import Image from 'next/image';

type VideoSectionProps = {
  videoSrc: string;
  heading: string;
  subHeading: string;
  sectionRef: React.RefObject<HTMLDivElement>;
  setVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  heading,
  subHeading,
  sectionRef,
  setVideoLoaded,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {
        const videoElement = videoRef.current;
        const checkVideoLoaded = () => {
          if (videoElement.readyState >= 3) {
            setVideoLoaded(true);
          }
        };
        checkVideoLoaded();
      }
    }, 3500);
  }, [setVideoLoaded]);

  const scrollToTop = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  return (
    <section
      ref={sectionRef}
      className='section h-screen flex items-center justify-center relative'
    >
      <video
        ref={videoRef}
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
        src={videoSrc}
        autoPlay
        loop
        muted
      />
      <div className='absolute z-10 text-left top-48 sm:w-auto sm:text-left sm:left-8 sm:mt-12 md:left-40 lg:left-52 xl:left-28'>
        <h1
          className={`${orbitron.className} text-6xl p-2 text-gradient text-left font-medium sm:text-3xl sm:font-semibold`}
        >
          {heading}
        </h1>
        <p className='text-black-50 p-4 text-3xl text-left font-semibold sm:text-base'>
          {subHeading}
        </p>
        <p className='text-black-50 p-4 font-medium text-left text-xl sm:text-xs sm:font-semibold'>
          우주 여행의 문을 여는 창구, Voyage X입니다.
          <br />
          상상으로 꿈꾸던 우주 여행을 현실로 만들어 드립니다.
        </p>
      </div>

      <div
        onClick={scrollToTop}
        className='absolute cursor-pointer bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20'
      >
        <Image
          src='/images/scroll-text.png'
          alt='Scroll Down'
          className='w-[60px] h-12 sm:w-10 sm:h-10'
          width={60}
          height={48}
        />
      </div>
    </section>
  );
};

export default VideoSection;
