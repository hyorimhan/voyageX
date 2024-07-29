import MyPageSideBar from '@/components/mypage/MyPageSideBar';
import Page from '@/components/pages/Page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='flex'>
        <MyPageSideBar />
        <main className='flex-grow ml-40 w-96 mt-[139px]'>{children}</main>
      </div>
    </Page>
  );
}

export default Layout;
