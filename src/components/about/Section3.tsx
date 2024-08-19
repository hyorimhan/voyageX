import React from 'react';
import Scroll from './Scroll';
import Image from 'next/image';
import { orbitron } from '../../../public/fonts/orbitron';

function Section3() {
  return (
    <section className=' relative lg:min-h-screen sm:h-auto mx-auto  sm:overflow-hidden flex flex-col items-center justify-center w-full sm:min-h-full '>
      <video
        src='/videos/backgroundVideo.mp4'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />

      {/* <div className='relative w-[1120px] sm:w-full mx-auto sm:p-3 '> */}
      <div className='relative  lg:min-h-screen h-full  w-full mx-auto  z-10  md:h-full flex flex-col justify-center   bg-black-900 bg-opacity-50'>
        <Scroll>
          <div className='sm:items-center text-center   sm:justify-center  sm:text-sm sm:w-full sm:py-3 '>
            <div className='w-[1120px] mx-auto  sm:w-full sm:flex  sm:flex-col sm:items-center'>
              <div
                className={`${orbitron.className} mb-8 sm:mb-9 sm:w-[335px] text-[28px] font-semibold sm:text-lg text-left`}
              >
                SERVICE CONCEPT
              </div>

              <div className='gap-3 grid grid-cols-[436px_1fr] sm:grid-cols-1 '>
                <div className='relative w-[436px] sm:w-[335px] h-[436px] rounded-2xl'>
                  <Image
                    src={'/images/about/serviceConcept.svg'}
                    alt='voyageXconcept'
                    fill
                    className='object-cover rounded-2xl'
                  />
                  <div className='font-medium  absolute ml-9 lg:mt-[343px] sm:mt-[355px]'>
                    <p>Voyage X는</p>
                    <p>우주에 대한 꿈을 현실로 만들어 주는</p>
                    <p>특별한 플랫폼입니다.</p>
                  </div>
                </div>
                <div className='relative  sm:grid-cols-1 sm:grid sm:gap-y-[11px] '>
                  <div className='flex lg:gap-[18px] sm:gap-[11px]  '>
                    <div className='w-[209px] sm:w-[162px] sm:h-[204px] h-[209px] border  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                      <Image
                        src={'/images/about/ticketIcon.svg'}
                        alt='ticketIcon'
                        width={40}
                        height={40}
                        className='mx-auto'
                      />
                      <div className='text-center mt-4 sm:text-xs'>
                        <p>다양한 우주 여행 상품 구매,</p>
                        <p>자신만의 티켓을 소중하게 보관</p>
                      </div>
                    </div>
                    <div>
                      <div className='w-[209px] h-[209px]  sm:w-[162px] sm:h-[204px]  border  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                        <Image
                          src={'/images/about/community.svg'}
                          alt='ticketIcon'
                          width={40}
                          height={40}
                          className='mx-auto'
                        />
                        <div className='  text-center mt-4 sm:text-xs'>
                          <p>우주와 관련된</p>
                          <p>흥미로운 정보들을 공유하는</p>
                          <p>커뮤니티 공간 제공</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex lg:gap-[245px] sm:gap-[11px] lg:mt-[18px]   '>
                    <div>
                      <div className='w-[209px] h-[209px] border  sm:w-[162px] sm:h-[204px]  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                        <Image
                          src={'/images/about/shoppingbag.svg'}
                          alt='ticketIcon'
                          width={40}
                          height={40}
                          className='mx-auto'
                        />
                        <div className='text-center mt-4 sm:text-xs '>
                          <p>우주를 테마로 한</p>
                          <p>다양한 굿즈 구매 가능,</p>
                          <p>우주에 대한 관심 지속</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='w-[209px] h-[209px] border  sm:w-[162px] sm:h-[204px]  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                        <Image
                          src={'/images/about/space.svg'}
                          alt='ticketIcon'
                          width={40}
                          height={40}
                          className='mx-auto'
                        />
                        <div className='text-center mt-4 sm:text-xs'>
                          <p>우주의 매력을</p>
                          <p>직접 체험할 수 있는 기회 제공</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section3;
