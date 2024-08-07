import AuthImg from '@/components/auth/AuthImg';
import SignupForm from '@/components/auth/signup/SignupForm';
import Page from '@/components/pages/Page';

const SignUpPage = () => {
  return (
    <Page>
      <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1'>
        <div className='my-auto lg:block  md:hidden sm:hidden'>
          <AuthImg />
        </div>
        <div className='lg:mx-0 md:mx-0 sm:mx-auto'>
          <SignupForm />
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
