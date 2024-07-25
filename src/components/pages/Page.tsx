import { PropsWithChildren } from 'react';

const Page = ({ children }: PropsWithChildren) => {
  return <div className=' mx-auto max-w-[1120px]'>{children}</div>;
};

export default Page;
