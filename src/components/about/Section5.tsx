import React from 'react';
import Scroll from '@/components/about/Scroll';

function Section5() {
  return (
    <section className='relative sm:w-full sm:h-screen md:w-full md:h-screen sm:overflow-hidden'>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/zsby87svuoi9tk8l926o0/5299569-hd_1920_1080_24fps.mp4?rlkey=f6nyppd92bxxoqtra8d0qn0h6&st=qbrewd0v&dl=0'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full sm:h-full object-cover'
      />
      <div className='relative z-10 min-h-screen sm:h-full md:h-full flex flex-col justify-center bg-black-800 bg-opacity-60'>
        <Scroll>
          <div className=' text-[20px] sm:w-full md:w-full w-[1120px] mx-auto text-right sm:text-center sm:text-sm '>
            <div className='text-3xl sm:text-2xl'>Mission</div>
            <div className='my-5 space-y-2 '>
              <p>
                첨단 기술과 창의적 서비스로 누구나 상업적으로 우주여행을 즐길 수
                있도록 하여
              </p>
              <p>
                다양한 사람들이 우주를 탐험하고 수많은 영감을 얻도록 돕습니다.
              </p>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section5;
