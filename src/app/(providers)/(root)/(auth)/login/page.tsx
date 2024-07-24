import KakaoLogin from '@/components/auth/kakao/KakaoLogin';
import LoginForm from '@/components/auth/login/LoginForm';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';
import Page from '@/components/pages/Page';

const LoginPage = () => {
  return (
    <Page>
      <LoginForm />
      <LogoutBtn />
      <KakaoLogin />
    </Page>
  );
};

export default LoginPage;
