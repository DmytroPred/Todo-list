'use client';
import { PropsWithChildren, createContext, useState } from 'react';
import { User } from 'firebase/auth';
import { Dispatch } from 'react';

export interface AuthContextType {
  user: User | null;
  authenticated: boolean;
  setUser: Dispatch<User | null>;
  setIsAuthenticated: Dispatch<User | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
});

export function AuthContextProvider(props: PropsWithChildren) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function setCurrentUserHandler(user: User | null): void {
    setCurrentUser(user);
  }

  function setIsAuthenticatedHandler(user: User | null): void {
    setIsAuth(!!user);
  }

  const context: AuthContextType = {
    user: currentUser,
    authenticated: isAuth,
    setUser: setCurrentUserHandler,
    setIsAuthenticated: setIsAuthenticatedHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
