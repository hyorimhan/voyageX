import Header from '@/components/common/Header';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Voyage X',
  description: '상상을 현실로, 우주에서의 만남',
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='font-pretendard select-none'>
      <Header />
      <Toaster />
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
