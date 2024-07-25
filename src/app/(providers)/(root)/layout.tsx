import { userLoginInfo } from '@/services/auth';
import Header from '@/components/common/Header';
import { Toaster } from 'react-hot-toast';

async function RootLayout({ children }: { children: React.ReactNode }) {
  const loginInfo = await userLoginInfo();

  return (
    <div>
      <Header loginInfo={loginInfo} />
      <Toaster />
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
