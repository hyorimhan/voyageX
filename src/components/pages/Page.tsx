import { PropsWithChildren } from 'react';

const Page = ({ children }: PropsWithChildren) => {
  return <div className='mx-auto max-w-screen-xl'>{children}</div>;
};

export default Page;
