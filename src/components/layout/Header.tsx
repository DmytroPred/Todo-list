import { useNavigate } from 'react-router-dom';
import LogoutButton from '../ui/LogoutButton';
import { useContext } from 'react';
import AuthContext, { AuthContextType } from '../../store/auth-context';

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext<AuthContextType>(AuthContext);

  return (
    <div className='bg-black py-8 px-8 text-white flex justify-between items-center'>
      <img
        className='w-12'
        src='https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png'
        alt=''
      />
      <div>
        {authCtx.authenticated ? (
          <LogoutButton></LogoutButton>
        ) : (
          <button onClick={() => navigate('auth')}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Header;
