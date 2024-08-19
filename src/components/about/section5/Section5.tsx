import React from 'react';
import Scroll from '@/components/about/Scroll';
import { orbitron } from '../../../../public/fonts/orbitron';
import SectionSwiper from './SectionSwiper';

function Section5() {
  return (
    <section className='relative sm:w-full sm:h-screen md:w-full md:h-screen sm:overflow-hidden'>
      <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section5.mp4?t=2024-08-16T08%3A00%3A59.871Z'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />
      <div className='relative z-10 min-h-screen sm:h-full md:h-full flex flex-col justify-center bg-black-800 bg-opacity-30'>
        <Scroll>
          <div className=' text-[20px] sm:w-full md:w-full w-[1120px] mx-auto text-right sm:text-center sm:text-sm '>
            <div
              className={`${orbitron.className} mb-8 text-[28px] font-semibold sm:text-lg text-left`}
            >
              A11&apos;s Power Players
            </div>
            <div className='my-5 space-y-2 '>
              <SectionSwiper />
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section5;
