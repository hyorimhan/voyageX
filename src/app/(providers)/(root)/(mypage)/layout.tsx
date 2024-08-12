import MyPageSideBar from '@/components/mypage/MyPageSideBar';
import Page from '@/components/pages/Page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='flex flex-col lg:flex-row'>
        <div className='hidden md:block lg:block lg:w-[375px]'>
          <MyPageSideBar />
        </div>
        <main className='sm:mx-5'>{children}</main>
      </div>
    </Page>
  );
}

export default Layout;
