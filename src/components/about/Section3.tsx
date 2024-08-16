import React from 'react';
import Scroll from './Scroll';

function Section3() {
  return (
    <section className=' relative min-h-screen sm:overflow-x-hidden flex flex-col items-center justify-center sm:w-full sm:h-screen sm:overflow-hidden'>
      <video
        src='/videos/section3.mp4'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />
      <div className='relative w-[1120px] sm:w-full mx-auto sm:p-3 '>
        <Scroll>
          <div className='sm:items-center text-center  sm:justify-center  sm:text-sm sm:w-full sm:py-3 '>
            <div className='mb-8 text-[28px] font-semibold sm:text-lg'>
              Service Concept{' '}
            </div>
            <div className='space-y-6 text-xl  sm:text-sm sm:w- sm:w-full sm:p-5  bg-black-800 bg-opacity-50 lg:p-8'>
              <div>
                voyage x는 우주에 대한 꿈을 현실로 만들어 주는 특별한
                플랫폼입니다.
              </div>
              <div>
                다양한 우주 여행 상품을 구매하고, 자신만의 티켓을 소중하게
                보관할 수 있습니다.
              </div>
              <div>
                우주와 관련된 흥미로운 정보들을 공유하는 커뮤니티 공간을
                제공합니다.
              </div>
              <div>
                우주를 테마로 한 다양한 굿즈 구매가 가능하고, 우주에 대한 관심을
                지속할 수 있습니다.
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section3;
