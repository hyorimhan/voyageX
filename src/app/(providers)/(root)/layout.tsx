// import { userLoginInfo } from '@/services/auth';
import { Toaster } from 'react-hot-toast';

async function RootLayout({ children }: { children: React.ReactNode }) {
  // const userInfo = await userLoginInfo();

  return (
    <div>
      <Toaster />
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
