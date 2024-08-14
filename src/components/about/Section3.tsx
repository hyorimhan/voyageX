import React from 'react';
import Scroll from './Scroll';

function Section3() {
  return (
    <section className=' relative min-h-screen sm:overflow-x-hidden flex flex-col items-center justify-center sm:w-full sm:h-screen sm:overflow-hidden'>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/g4sevf330uuy6cl0s6sws/3.mp4?rlkey=t3gjn9228bzw3svvymt8t5kam&st=noumfva3'
        autoPlay
        muted
        loop
        className='absolute top-0 left-0 object-cover sm:w-full sm:h-full'
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
                voyage X는 사용자가 다양한 우주 여행 상품을 구매하고, 자신만의
                티켓을 소중하게 보관할 수 있는 기능을 제공합니다.
              </div>
              <div>
                또한, 우주를 좋아하는 사람들이 모여서 이야기를 나누고, 우주와
                관련된 흥미로운 정보들을 공유할 수 있는 커뮤니티를 제공합니다.
              </div>
              <div>
                굿즈샵에서는 우주를 테마로 한 다양한 상품을 구매할 수 있어,
                우주에 대한 관심을 더욱 즐겁게 이어나갈 수 있습니다.
              </div>
              <div>
                <div>
                  우주에 관심도가 낮은 사람들에겐 다양한 우주 여행 상품을 통해
                  우주의 매력을 직접 체험할 수 있는 기회를 제공하고,
                </div>
                우주를 사랑하는 사람들은 커뮤니티에 모여, 자신만의 우주 이야기를
                만들고, 함께 나눌 수 있는 공간을 만들기 위해 기획되었습니다.
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section3;
