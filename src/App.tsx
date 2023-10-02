import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Auth from './pages/Auth';
import AuthContext, { AuthContextType } from './store/auth-context';
import { useContext } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import UnAuthGuard from './components/guards/UnAuthGuard';

function App() {
  const authCtx = useContext<AuthContextType>(AuthContext);

  onAuthStateChanged(auth, async (user) => {
    authCtx.setUser(user);
    authCtx.setIsAuthenticated(user);
  });

  return (
    <Layout>
      <Routes>
        <Route path='' element={<Home />}></Route>

        <Route element={<UnAuthGuard />}>
          <Route path='auth' element={<Auth />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
