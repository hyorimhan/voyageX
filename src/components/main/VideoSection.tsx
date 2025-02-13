import React, { useRef, useEffect } from 'react';
import { orbitron } from '../../../public/fonts/orbitron';
import Image from 'next/image';
import ScrollBtn from './ScrollBtn';

type VideoSectionProps = {
  videoSrc: string;
  heading: string;
  subHeading: string;
  sectionRef: React.RefObject<HTMLDivElement>;
  setVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  source: React.ReactNode;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  heading,
  subHeading,
  sectionRef,
  setVideoLoaded,
  source,
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
    }, 2200);
  }, [setVideoLoaded]);

  return (
    <section
      ref={sectionRef}
      className='section h-screen flex items-center justify-center relative'
    >
      <video
        ref={videoRef}
        className='absolute sm:object-left top-0 left-0 w-full h-full object-cover z-0'
        src={videoSrc}
        autoPlay
        loop
        playsInline
        muted
      />
      <div className='absolute z-10 text-left top-48 sm:w-auto sm:text-left sm:left-8 sm:mt-12 md:left-40 lg:left-52 xl:left-28'>
        <h1
          className={`${orbitron.className} text-6xl p-4 text-left font-medium sm:text-4xl sm:font-semibold`}
        >
          {heading}
        </h1>
        <p className='text-black-50 p-4 text-3xl text-left font-semibold sm:text-xl'>
          {subHeading}
        </p>
        <p className='text-black-50 p-4 font-medium text-left text-xl sm:text-sm sm:font-semibold'>
          우주 여행의 문을 여는 창구, Voyage X입니다.
          <br />
          상상으로 꿈꾸던 우주 여행을 현실로 만들어 드립니다.
        </p>
      </div>

      <ScrollBtn />
      <div className='text-xs  text-white absolute bottom-3 right-3'>
        {source}
      </div>
    </section>
  );
};

export default VideoSection;
