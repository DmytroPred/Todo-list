'use client';
import FormTitle from '../components/ui/FormTitle';
import AuthForm from '../components/ui/AuthForm';
import GoogleLoginButton from '../components/ui/GoogleLoginButton';

const SignIn = () => {
  return (
    <div className='form-container'>
      <FormTitle title='Sign in'></FormTitle>
      <AuthForm isSignUp={false} />
      <GoogleLoginButton></GoogleLoginButton>
    </div>
  );
};

export default SignIn;
