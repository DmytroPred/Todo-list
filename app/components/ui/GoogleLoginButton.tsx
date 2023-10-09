import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import classes from './GoogleLoginButton.module.css';

const GoogleLoginButton = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={signInWithGoogle} className={classes.google}>
      <img
        className='w-8 h-8'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
        alt='Google'
      />
      Sign In With Google
    </button>
  );
};

export default GoogleLoginButton;
