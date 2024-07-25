function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-custom-background bg-contain pt-[80px]'>
      <main className='h-screen'>{children}</main>
    </div>
  );
}

export default Layout;
