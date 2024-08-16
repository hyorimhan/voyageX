import React from 'react';
import Scroll from './Scroll';

function Section6() {
  return (
    <section className='relative sm:w-full sm:h-screen md:w-full md:h-screen md:overflow-hidden sm:overflow-hidden'>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/l2nyd9ksygfr3sdxl8qir/8047710-hd_1920_1080_30fps.mp4?rlkey=y4ypnltssl9f92weab3xubkej&st=bx0ffanf'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full sm:h-full object-cover'
      />
      <div className='relative z-10 min-h-screen flex flex-col justify-center bg-black-800 bg-opacity-30'>
        <Scroll>
          <div className=' text-[20px] sm:w-full w-[1120px] mx-auto text-right sm:text-center sm:text-sm  md:w-full '>
            <span className='text-3xl sm:text-2xl '>Vision</span>
            <div className='my-5 space-y-2'>
              <p>
                voyageX의 비전은 우주 여행이 특별한 사람들만의 전유물이 아니라
                모든 인류가 경험할 수 있는 일상적인 활동이 되는 것입니다.
              </p>
              <p>
                향후 수십 년 안에, 우리는 지구와 더 많은 행성들 사이의 여행을
                일상화하고 우주에서의 삶을 현실로 만들고자 합니다.
              </p>
              <p>
                이러한 비전을 달성하기 위해 voyageX는 지속적인 혁신, 안전성
                강화, 그리고 가격 접근성을 높이는 데 주력하고 있습니다.
              </p>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section6;
