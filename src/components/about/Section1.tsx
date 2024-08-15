import React from 'react';
import Scroll from './Scroll';
import MainText from './MainText';

function Section1() {
  return (
    <section className='relative sm:w-full h-screen sm:overflow-hidden sm:mx-auto'>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/9kb8lsbhizo1ioqn1jssr/7169896-hd_2048_1080_25fps.mp4?rlkey=yay53fjf8utdv38hfq3vbvyxy&st=s81tqoar'
        autoPlay
        muted
        loop
        data-video
        className='absolute top-0 left-0  w-full sm:h-full object-cover'
      />
      <div className='relative z-10 flex h-full flex-col lg:w-[1120px] w-full mx-auto'>
        <Scroll>
          <div className='text-black-200 space-x-3 font-bookmyungjo sm:w-[300px] mx-auto mt-[200px] flex flex-col justify-center '>
            <MainText baseVelocity={-5}>ABOUT US</MainText>
            <MainText baseVelocity={5}>VOYAGE X</MainText>
          </div>
          <div className='text-center font-pretendard mt-32 text-3xl sm:text-lg sm:px-2 text-black-200'>
            <h2 className='mt-10'>
              우주 탐험의 꿈을 현실로
              <p>
                우주 여행사 voyageX에서 제공하는 놀라운 행성 여행 상품과
                커뮤니티를 경험해보세요
              </p>
            </h2>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section1;
