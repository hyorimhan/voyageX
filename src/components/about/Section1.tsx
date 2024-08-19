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
      <div className='relative  h-full w-full   mx-auto  z-10  md:h-full flex flex-col   bg-black-900 bg-opacity-20'>
        <Scroll>
          <div className='text-center font-pretendard mt-[139px] sm:mx-5  '>
            <div
              className={`${orbitron.className} font-semibold text-left text-4xl w-[1120px] mx-auto sm:text-xl `}
            >
              ABOUT US
            </div>
            <div className='lg:mt-[92px] sm:mt-10'>
              <p className='lg:text-2xl font-medium sm:text-left  '>
                여행, 커뮤니티, 쇼핑까지
              </p>
              <p className='font-yangpyeong font-bold text-[28px] sm:hidden'>
                우주와의 모든 경험을 가능하게 하는 통합
              </p>
              <div className='font-yangpyeong font-bold sm:text-xl lg:hidden md:hidden text-left mt-2 mb-5'>
                <p>우주와의 모든 경험을</p>
                <p>가능하게 하는 통합</p>
              </div>

              <p className='text-lg mt-7 sm:hidden '>
                우주 여행사 Voyage X에서 제공하는 놀라운 행성 여행 상품과
                커뮤니티, 그리고 굿즈까지 경험해보세요.
              </p>
              <div className='sm:text-sm lg:hidden text-left md:hidden'>
                <p>우주 여행사 Voyage X에서 제공하는</p>
                <p>놀라운 행성 여행 상품과 커뮤니티, 굿즈까지 경험해보세요.</p>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section1;
