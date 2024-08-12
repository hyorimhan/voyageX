'use client';
import Lottie from 'react-lottie-player';
import lottieJson from '../../public/404/404.json';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className='lg:w-[600px] sm:mt-[30%] mt-10 mx-auto flex items-center justify-center flex-col sm:w-[300px]'>
      <Lottie loop animationData={lottieJson} play />
      <button
        className='bg-primary-500 rounded-lg w-full mx-auto font-pretendard p-3 hover:bg-primary-300'
        onClick={() => router.replace('/')}
      >
        메인으로 이동
      </button>
    </div>
  );
};

export default NotFound;
