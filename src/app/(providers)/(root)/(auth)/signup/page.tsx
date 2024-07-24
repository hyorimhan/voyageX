import SignupForm from '@/components/auth/signup/SignupForm';
import SparkleEffect from '@/components/auth/SparkleEffect';
import Page from '@/components/pages/Page';

const SignUpPage = () => {
  return (
    <Page>
      <SparkleEffect />
      <SignupForm />
    </Page>
  );
};

export default SignUpPage;
