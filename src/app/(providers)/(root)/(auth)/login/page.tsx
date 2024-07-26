import KakaoLogin from '@/components/auth/kakao/KakaoLogin';
import LoginForm from '@/components/auth/login/LoginForm';
import LogoutBtn from '@/components/auth/logout/LogoutBtn';
import Page from '@/components/pages/Page';
import { createClient } from '@/supabase/client';

const LoginPage = async () => {
  const supabase = createClient();
  const { data: userInfo } = await supabase.auth.getUser();
  console.log(userInfo);
  return (
    <Page>
      <LoginForm />
      <LogoutBtn />
      <KakaoLogin />
    </Page>
  );
};

export default LoginPage;
