import { PropsWithChildren } from 'react';
import BackgroundVideo from '../common/BackgroundVideo';

const Page = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className='relative'>
        <BackgroundVideo />
        <div className='relative mx-auto max-w-[1120px] sm:mt-[70px] lg:mt-[131px] text-black-50'>
          {children}
        </div>
      </div>
    </>
  );
};

export default Page;
