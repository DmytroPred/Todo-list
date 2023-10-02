import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const UnAuthGuard = () => {
  const authCtx = useContext(AuthContext);

  return authCtx.authenticated ? <Navigate to='/' /> : <Outlet />;
};

export default UnAuthGuard;
