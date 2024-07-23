import MyPageSideBar from '@/components/mypage/MyPageSideBar';
import Page from '@/components/pages/Page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='flex'>
        <MyPageSideBar />
        <main className='flex-grow ml-48'>{children}</main>
      </div>
    </Page>
  );
}

export default Layout;
