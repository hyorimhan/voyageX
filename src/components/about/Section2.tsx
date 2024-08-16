import Scroll from './Scroll';

function Section2() {
  return (
    <section className='relative sm:w-full sm:h-screen sm:overflow-hidden '>
      <video
        src='/videos/section2.mp4'
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='relative z-10 min-h-screen sm:h-screen flex flex-col justify-center sm:items-center'>
        <Scroll>
          <div className=' text-[20px] sm:w-full w-[1120px] mx-auto text-right sm:text-center  '>
            <span className='text-3xl sm:text-xl '>VOYAGE X</span>
            <div className='my-5 sm:text-sm'>
              voyage X는 여정, 항해라는 뜻의 Voyage와 미지수 X를 합친 말로
              <div>미지로의 항해라는 의미입니다.</div>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section2;
