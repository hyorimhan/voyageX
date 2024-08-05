import Page from '@/components/pages/Page';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <h1 className='text-[36px] font-bold text-white mt-[112px] mb-14 font-yangpyeong'>
        <Link href='/community'>자유게시판</Link>
      </h1>
      <div>{children}</div>
      <Toaster />
    </Page>
  );
}

export default RootLayout;
