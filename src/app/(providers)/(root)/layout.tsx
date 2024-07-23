function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-screen-lg mx-auto'>
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
