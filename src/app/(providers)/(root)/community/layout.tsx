import Page from '@/components/pages/Page';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='font-yangpyeong'>
        <h1 className='text-[36px] font-bold text-white mt-[112px] mb-[64px]'>
          <Link href='/community'>자유게시판</Link>
        </h1>
        {children}
      </div>
      <Toaster />
    </Page>
  );
}

export default RootLayout;
