import MyPageSideBar from '@/components/mypage/MyPageSideBar';
import Page from '@/components/pages/Page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <div className='flex mt-44'>
        <MyPageSideBar />
        <main className='flex-grow ml-36 w-96'>{children}</main>
      </div>
    </Page>
  );
}

export default Layout;
