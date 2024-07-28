import LoginForm from '@/components/auth/login/LoginForm';
import Chatbot from '@/components/chatbot/Chatbot';
import Page from '@/components/pages/Page';
import AuthImg from '@/components/auth/AuthImg';

const LoginPage = () => {
  return (
    <Page>
      <Chatbot />
      <div className='flex items-center'>
        <div className='w-1/2'>
          <AuthImg />
          <div />
        </div>
        <div className='w-1/2'>
          <LoginForm />
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
