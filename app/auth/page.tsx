'use client';
import { useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import GoogleLoginButton from '../components/ui/GoogleLoginButton';
import AuthContext from '../store/auth-context';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.authenticated) router.push('/');
  }, [authCtx.authenticated]);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col align-center justify-center w-1/2 h-1/2 m-auto mt-16'>
      <input
        className='text-input mb-3'
        type='mail'
        placeholder='Email...'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='text-input'
        type='password'
        placeholder='Password...'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <GoogleLoginButton></GoogleLoginButton>
    </div>
  );
};

export default Auth;