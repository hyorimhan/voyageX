import LoginForm from '@/components/auth/login/LoginForm';
import Chatbot from '@/components/chatbot/Chatbot';
import Page from '@/components/pages/Page';

const LoginPage = () => {
  return (
    <Page>
      <LoginForm />
      <Chatbot />
    </Page>
  );
};

export default LoginPage;
