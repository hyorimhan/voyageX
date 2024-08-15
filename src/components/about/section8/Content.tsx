import { useRef, useEffect } from 'react';
import { usePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import TopBtnMobile from '@/components/common/TopBtnMobile';

function Content() {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.(),
      });
    }
  }, [isPresent, safeToRemove]);
  return (
    <div
      ref={ref}
      className='w-[400px] h-[500px] sm:w-full flex items-start justify-center font-yuna bg-black-50 font-[240px] rounded-lg'
    >
      <div className='flex flex-col justify-center text-center text-3xl text-black-900'>
        <Image
          src={'https://i.ibb.co/rf2Jyx3/d302b09a0e6efb732c14deb58747e57f.jpg'}
          alt='명수팍'
          width={400}
          height={300}
          className='p-5'
        />
        <p className='my-5'>여기까지 봐주셔서 감사합니다!!</p>
        <div>
          <p>스크롤 올리기 귀찮으시죠</p>
          <p>요 귀여운 도넛을 클릭해주세요</p>
        </div>
        <div className='flex justify-center p-5'>
          <TopBtnMobile size={100} />
        </div>
      </div>
    </div>
  );
}

export default Content;
