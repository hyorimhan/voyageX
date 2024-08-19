import React from 'react';
import Scroll from './Scroll';
// import MainText from './MainText';
import { orbitron } from '../../../public/fonts/orbitron';

function Section1() {
  return (
    <section className='relative sm:w-full h-screen sm:overflow-hidden sm:mx-auto'>
      <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section1.mp4'
        autoPlay
        muted
        loop
        playsInline
        data-video
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='relative  h-full    mx-auto  z-10  md:h-full flex flex-col   bg-black-800 bg-opacity-20'>
        {/* <div className='relative z-10 flex h-full flex-col lg:w-[1120px] w-full mx-auto'> */}
        <Scroll>
          {/* <div className='text-black-200 space-x-3 font-bookmyungjo sm:w-[300px] mx-auto mt-[200px] flex flex-col justify-center '>
            <MainText baseVelocity={-5}>ABOUT US</MainText>
            <MainText baseVelocity={5}>VOYAGE X</MainText>
          </div> */}
          <div className='text-center font-pretendard mt-[139px] '>
            <div
              className={`${orbitron.className} font-semibold text-left text-4xl w-[1120px] mx-auto`}
            >
              ABOUT US
            </div>
            <div className='mt-[92px]'>
              <p className='text-2xl font-medium'>여행, 커뮤니티, 쇼핑까지</p>
              <p className='font-yangpyeong font-bold text-[28px]'>
                우주와의 모든 경험을 가능하게 하는 통합
              </p>
              <p className='text-lg mt-7'>
                우주 여행사 Voyage X에서 제공하는 놀라운 행성 여행 상품과
                커뮤니티, 그리고 굿즈까지 경험해보세요.
              </p>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section1;
