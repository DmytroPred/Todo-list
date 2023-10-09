'use client';
import { PropsWithChildren, useContext } from 'react';
import Header from './Header';
import AuthContext, { AuthContextType } from '@/app/store/auth-context';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/config/firebase';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const authCtx = useContext<AuthContextType>(AuthContext);

  onAuthStateChanged(auth, async (user) => {
    authCtx.setUser(user);
    authCtx.setIsAuthenticated(user);
    routeGuard(user);
  });

  function routeGuard(user: User | null) {
    if (user) {
      router.push('/');
    } else {
      router.push('/sign-in');
    }
  }

  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
