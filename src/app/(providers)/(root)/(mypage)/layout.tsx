import MyPageSideBar from '@/components/mypage/MyPageSideBar';
import Page from '@/components/pages/Page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='flex'>
        <MyPageSideBar />
        <main className='sm:hidden flex-grow ml-[94px] w-full '>
          {children}
        </main>
      </div>
    </Page>
  );
}

export default Layout;
