'use client';
import { PropsWithChildren, useContext } from 'react';
import Header from './Header';
import AuthContext, { AuthContextType } from '@/app/store/auth-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/config/firebase';

const Layout = ({ children }: PropsWithChildren) => {
  const authCtx = useContext<AuthContextType>(AuthContext);

  onAuthStateChanged(auth, async (user) => {
    authCtx.setUser(user);
    authCtx.setIsAuthenticated(user);
  });

  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
