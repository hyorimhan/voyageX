import React from 'react';
import Scroll from './Scroll';
import Image from 'next/image';
import { orbitron } from '../../../public/fonts/orbitron';

function Section3() {
  return (
    <section className=' relative min-h-screen sm:overflow-x-hidden flex flex-col items-center justify-center sm:w-full sm:h-screen sm:overflow-hidden'>
      <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section3%20(2).mp4'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />

      {/* <div className='relative w-[1120px] sm:w-full mx-auto sm:p-3 '> */}
      <div className='relative  min-h-screen h-full  w-full mx-auto  z-10  md:h-full flex flex-col justify-center   bg-black-800 bg-opacity-20'>
        <Scroll>
          <div className='sm:items-center text-center  sm:justify-center  sm:text-sm sm:w-full sm:py-3 '>
            <div className='w-[1120px] mx-auto'>
              <div
                className={`${orbitron.className} mb-8 text-[28px] font-semibold sm:text-lg text-left`}
              >
                SERVICE CONCEPT
              </div>

              <div className='grid grid-cols-2'>
                <div className='relative w-[436px] h-[436px] rounded-2xl'>
                  <Image
                    src={'/images/about/serviceConcept.svg'}
                    alt='voyageXconcept'
                    fill
                    className='object-contain'
                  />
                  <div className='font-medium absolute ml-9 mt-[343px]'>
                    <p>Voyage X는</p>
                    <p>우주에 대한 꿈을 현실로 만들어 주는</p>
                    <p>특별한 플랫폼입니다.</p>
                  </div>
                </div>
                <div className='w-[663px] relative'>
                  <div className='flex gap-[18px] '>
                    <div className='w-[209px] h-[209px] border  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                      <Image
                        src={'/images/about/ticketIcon.svg'}
                        alt='ticketIcon'
                        width={40}
                        height={40}
                        className='mx-auto'
                      />
                      <div className='text-center mt-4'>
                        <p>다양한 우주 여행 상품 구매,</p>
                        <p>자신만의 티켓을 소중하게 보관</p>
                      </div>
                    </div>
                    <div>
                      <div className='w-[209px] h-[209px] border  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                        <Image
                          src={'/images/about/community.svg'}
                          alt='ticketIcon'
                          width={40}
                          height={40}
                          className='mx-auto'
                        />
                        <div className='  text-center mt-4'>
                          <p>우주와 관련된</p>
                          <p>흥미로운 정보들을 공유하는</p>
                          <p>커뮤니티 공간 제공</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-[245px] mt-[18px]'>
                    <div>
                      <div className='w-[209px] h-[209px] border  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                        <Image
                          src={'/images/about/shoppingbag.svg'}
                          alt='ticketIcon'
                          width={40}
                          height={40}
                          className='mx-auto'
                        />
                        <div className='text-center mt-4 '>
                          <p>우주를 테마로 한</p>
                          <p>다양한 굿즈 구매 가능,</p>
                          <p>우주에 대한 관심 지속</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='w-[209px] h-[209px] border  flex flex-col items-center justify-center rounded-2xl bg-black-800 border-black-700'>
                        <Image
                          src={'/images/about/space.svg'}
                          alt='ticketIcon'
                          width={40}
                          height={40}
                          className='mx-auto'
                        />
                        <div className='text-center mt-4'>
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
