import AuthImg from '@/components/auth/AuthImg';
import SignupForm from '@/components/auth/signup/SignupForm';
import Page from '@/components/pages/Page';

const SignUpPage = () => {
  return (
    <Page>
      <div className='flex items-center'>
        <div className='w-1/2'>
          <AuthImg />
        </div>
        <div className='w-1/2'>
          <SignupForm />
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
