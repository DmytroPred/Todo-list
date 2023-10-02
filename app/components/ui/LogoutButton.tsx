import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const LogoutButton = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
