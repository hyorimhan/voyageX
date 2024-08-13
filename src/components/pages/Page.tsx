import { PropsWithChildren } from 'react';
import BackgroundVideo from '../common/BackgroundVideo';

const Page = ({ children }: PropsWithChildren) => {
  return (
    <>
      <BackgroundVideo />
      <div className=' mx-auto max-w-[1120px] sm:mt-[70px] lg:mt-[131px] text-black-50'>
        {children}
      </div>
    </>
  );
};

export default Page;
