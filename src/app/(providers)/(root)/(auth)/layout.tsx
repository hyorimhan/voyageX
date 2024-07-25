function Layout({ children }: { children: React.ReactNode }) {
  // return (
  //   <div className='bg-custom-background bg-contain pt-[80px] max-h-screen'>
  //     <main>{children}</main>
  //   </div>
  return (
    <div className='bg-custom-background  flex flex-col h-screen pt-[80px]'>
      <main className='flex-grow overflow-hidden'>{children}</main>
    </div>
  );
}

export default Layout;
