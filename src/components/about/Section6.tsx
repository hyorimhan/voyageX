import React from 'react';
import Scroll from './Scroll';

function Section6() {
  return (
    <section className='relative sm:w-full sm:h-screen md:w-full md:h-screen md:overflow-hidden sm:overflow-hidden'>
      <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section6%20(2).mp4?t=2024-08-16T08%3A01%3A10.130Z'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />
      <div className='relative z-10 min-h-screen flex flex-col justify-center bg-black-800 bg-opacity-30'>
        <Scroll>
          <div className=' text-[20px] sm:w-full w-[1120px] mx-auto text-right sm:text-center sm:text-sm  md:w-full '>
            <span className='text-3xl sm:text-2xl '>Vision</span>
            <div className='my-5 space-y-2'>
              <p>
                우주 여행을 모든 인류가 경험할 수 있는 일상적인 활동으로
                만들기위해
              </p>
              <p>
                지속적인 혁신, 안전성 강화, 가격 접근성 향상에 주력하고
                있습니다.
              </p>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section6;
