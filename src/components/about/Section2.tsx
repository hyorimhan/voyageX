import Scroll from './Scroll';

function Section2() {
  return (
    <section className='relative sm:w-full sm:h-screen sm:overflow-hidden '>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/cg80z00lc001yjq4dhuf4/7649283-hd_1920_1080_30fps.mp4?rlkey=2yh286kl70zdea35bq53og5tj&st=5rrqtlxb'
        autoPlay
        muted
        loop
        className='absolute top-0 left-0  w-full sm:h-full object-cover'
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
