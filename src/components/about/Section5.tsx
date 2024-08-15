import React from 'react';
import Scroll from '@/components/about/Scroll';

function Section5() {
  return (
    <section className='relative sm:w-full sm:h-screen md:w-full md:h-screen sm:overflow-hidden'>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/zsby87svuoi9tk8l926o0/5299569-hd_1920_1080_24fps.mp4?rlkey=f6nyppd92bxxoqtra8d0qn0h6&st=qbrewd0v&dl=0'
        autoPlay
        muted
        loop
        className='absolute top-0 left-0  w-full sm:h-full object-cover'
      />
      <div className='relative z-10 min-h-screen sm:h-full md:h-full flex flex-col justify-center bg-black-800 bg-opacity-60'>
        <Scroll>
          <div className=' text-[20px] sm:w-full md:w-full w-[1120px] mx-auto text-right sm:text-center sm:text-sm '>
            <div className='text-3xl sm:text-2xl'>Mission</div>
            <div className='my-5 space-y-2 '>
              <p>
                voyageX의 핵심 미션은 누구나 우주 여행을 즐길 수 있도록 하는
                것입니다.
              </p>
              <p>
                과거에는 꿈만 같았던 우주 탐험을 상업적으로 접근 가능하게
                만들어,
              </p>
              <p>
                다양한 사람들이 우주를 탐험하고 그 경험을 통해 영감을 얻을 수
                있도록 합니다.
              </p>
              <p>
                이를 위해 첨단 기술과 창의적인 서비스 모델을 도입해 우주 여행의
                가능성을 확대하고 있습니다.
              </p>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section5;
