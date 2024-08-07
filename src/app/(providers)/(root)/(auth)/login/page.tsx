import LoginForm from '@/components/auth/login/LoginForm';
// import Chatbot from '@/components/chatbot/Chatbot';
import Page from '@/components/pages/Page';
import AuthImg from '@/components/auth/AuthImg';

const LoginPage = () => {
  return (
    <Page>
      {/* <Chatbot /> */}
      <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1'>
        <div className='my-auto lg:block md:hidden sm:hidden'>
          <AuthImg />
          <div />
        </div>
        <div className='lg:mx-0 md:mx-0 sm:mx-auto'>
          <LoginForm />
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
