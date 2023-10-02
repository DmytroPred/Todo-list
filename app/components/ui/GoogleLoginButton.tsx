import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';

const GoogleLoginButton = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
};

export default GoogleLoginButton;
