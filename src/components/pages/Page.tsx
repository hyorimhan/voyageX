import { PropsWithChildren } from 'react';
import BackgroundVideo from '../common/BackgroundVideo';

const Page = ({ children }: PropsWithChildren) => {
  return (
    <>
      <BackgroundVideo />
      <div className=' mx-auto max-w-[1120px] text-black-50'>{children}</div>
    </>
  );
};

export default Page;
