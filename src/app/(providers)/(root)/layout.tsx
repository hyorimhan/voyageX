import { Toaster } from 'react-hot-toast';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
