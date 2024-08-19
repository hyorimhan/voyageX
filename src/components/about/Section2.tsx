import Scroll from './Scroll';
import BackgroundVideo from '../common/BackgroundVideo';
import Image from 'next/image';
import { orbitron } from '../../../public/fonts/orbitron';

function Section2() {
  return (
    <section className='relative sm:w-full sm:h-screen sm:overflow-hidden '>
      {/* <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section2%20(2).mp4'
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
      /> */}
      <video
        src='/videos/backgroundVideo.mp4'
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
      />

      {/* <div className='relative z-10 min-h-screen sm:h-screen flex flex-col justify-center sm:items-center'> */}
      <div className='relative  min-h-screen h-full  mx-auto  z-10  md:h-full flex flex-col justify-center   bg-black-800 bg-opacity-20'>
        <Scroll>
          <div className=' text-[20px] sm:w-full w-[1120px] mx-auto grid grid-cols-3'>
            <div className='w-[335px] relative h-[491px] rounded-2xl  '>
              <Image
                src={'/images/about/voyageX.svg'}
                alt='voyageX'
                fill
                className='object-cover '
              />
              <div className='absolute text-center mt-[175px]  '>
                <div className='w-[335px]'>
                  <p
                    className={`font-semibold text-[28px] ${orbitron.className}`}
                  >
                    VOYAGE X
                  </p>
                  <div className='font-medium text-sm mt-5'>
                    <p>Voyage X의 의미는 </p>
                    <p>여정, 항해라는 뜻의 Voyage와</p>
                    <p>미지수 X를 합친 말로</p>
                    ‘미지로의 향해’라는 의미입니다.
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[335px] relative h-[491px] rounded-2xl  '>
              <Image
                src={'/images/about/vision.svg'}
                alt='voyageX'
                fill
                className='object-cover'
              />
              <div className='absolute text-center mt-[175px]  '>
                <div className='w-[335px]'>
                  <p
                    className={`font-semibold text-[28px] ${orbitron.className}`}
                  >
                    VISION
                  </p>
                  <div className='font-medium text-sm mt-5'>
                    <p>우주 여행을 모든 인류가 경험할 수 있는 </p>
                    <p>일상적인 활동으로 만들기 위해 </p>
                    <p>지속적인 혁신, 안전성 강화, 가격 접근성 향상에</p>
                    주력하고 있습니다.
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[335px] relative h-[491px] rounded-2xl  '>
              <Image
                src={'/images/about/mission.svg'}
                alt='voyageX'
                fill
                className='object-cover'
              />
              <div className='absolute text-center mt-[175px]  '>
                <div className='w-[335px]'>
                  <p
                    className={`font-semibold text-[28px] ${orbitron.className}`}
                  >
                    MISSION
                  </p>
                  <div className='font-medium text-sm mt-5'>
                    <p>첨단 기술과 창의적 서비스로 누구나 </p>
                    <p>상업적으로 우주여행을 즐길 수 있도록 하여</p>
                    <p>다양한 사람들이 우주를 탐험하고</p>
                    수많은 영감을 얻도록 돕습니다.
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

export default Section2;
