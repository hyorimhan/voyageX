import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type VideoSectionProps = {
  videoSrc: string;
  heading: string;
  subHeading: string;
  sectionRef: React.RefObject<HTMLDivElement>;
};

const VideoSection: React.FC<VideoSectionProps> = ({ videoSrc, heading, subHeading, sectionRef }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

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

  useEffect(() => {
    if (videoLoaded && sectionRef.current) {
      const section = sectionRef.current;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      // 각 섹션의 텍스트가 점점 투명해지는 애니메이션
      if (textRefs.current[0]) {
        gsap.fromTo(
          textRefs.current[0],
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -50,
            scrollTrigger: {
              trigger: section,
              start: 'top+=100% center',
              end: 'bottom top',
              scrub: true,
              onUpdate: (self) => {
                if (self.progress < 0.1) {
                  gsap.to(textRefs.current[0], { opacity: 1, y: 0 });
                }
              },
            },
          },
        );
      }

      ScrollTrigger.refresh();
    }
  }, [videoLoaded, sectionRef]);

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
      <div
        ref={(el) => {
          textRefs.current[0] = el as HTMLDivElement;
        }}
        className='absolute z-10 text-center top-48 sm:w-auto sm:text-left sm:left-48 md:left-40 lg:left-52 xl:left-64'
      >
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