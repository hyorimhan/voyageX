import React, { useRef, useEffect } from 'react';

type VideoSectionProps = {
  videoSrc: string;
  heading: string;
  subHeading: string;
  sectionRef: React.RefObject<HTMLDivElement>;
  setVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoSection: React.FC<VideoSectionProps> = ({ videoSrc, heading, subHeading, sectionRef, setVideoLoaded }) => {
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
    }, 1000)
  }, [setVideoLoaded]);

  return (
    <section ref={sectionRef} className='section h-screen flex items-center justify-center relative'>
      <video
        ref={videoRef}
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
        src={videoSrc}
        autoPlay
        loop
        muted
      />
      <div className='absolute z-10 text-center top-48 sm:w-auto sm:text-left sm:left-48 md:left-40 lg:left-52 xl:left-64'>
        <h1 className='text-gradient text-6xl font-bold font-yangpyeong'>{heading}</h1>
        <p className='text-white p-4 text-3xl'>{subHeading}</p>
        <p className='text-white p-4'>
          우주 여행의 문을 여는 창구, Voyage X입니다.
          <br />
          상상으로 꿈꾸던 우주 여행을 현실로 만들어 드립니다.
        </p>
      </div>
    </section>
  );
};

export default VideoSection;