import Page from '@/components/pages/Page';
import { Toaster } from 'react-hot-toast';

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div>{children}</div>
      <Toaster />
    </Page>
  );
}

export default RootLayout;
