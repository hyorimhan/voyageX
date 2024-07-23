import MyPageSideBar from '@/components/mypage/MyPageSideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-row px-36 mt-32 max-w-full justify-center'>
      <MyPageSideBar />
      <main className='ml-36 '>{children}</main>
    </div>
  );
}

export default Layout;
