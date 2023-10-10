'use client';
import LogoutButton from '../ui/LogoutButton';
import { useContext } from 'react';
import AuthContext, { AuthContextType } from '../../store/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const authCtx = useContext<AuthContextType>(AuthContext);

  const loggedInTemplate = (
    <>
      <div className='flex gap-8'>
        <Link href='/create-task'>Create Task</Link>
        <LogoutButton></LogoutButton>
      </div>
    </>
  );

  return (
    <div className='shadow-lg bg-black py-8 px-8 text-white flex justify-between items-center'>
      <div className='flex gap-10'>
        <img
          className='w-12 cursor-pointer'
          src='https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png'
          alt=''
          onClick={() => router.push('/')}
        />

        <button onClick={() => router.push('/')}>Home</button>
      </div>
      <div>
        {authCtx.authenticated ? (
          loggedInTemplate
        ) : (
          <>
            <button className='mr-8' onClick={() => router.push('/sign-in')}>
              Sign in
            </button>
            <button onClick={() => router.push('/sign-up')}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
