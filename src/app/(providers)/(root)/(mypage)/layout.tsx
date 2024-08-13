import MyPageSideBar from '@/components/mypage/MyPageSideBar';
import Page from '@/components/pages/Page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='flex flex-col lg:flex-row'>
        <div className='sm:hidden md:hidden w-[190px] mr-[88px]'>
          <MyPageSideBar />
        </div>
        <main className='sm:mx-5 lg:w-full'>{children}</main>
      </div>
    </Page>
  );
}

export default Layout;
