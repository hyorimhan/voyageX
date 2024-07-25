import Header from '@/components/common/Header';
import { Toaster } from 'react-hot-toast';

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='font-pretendard'>
      <Header />
      <Toaster />
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
