import { auth } from '@/app/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        ).then((result) => {
          console.log(result);
        });
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password).then(
          (result) => {
            console.log(result);
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <input
        className='text-input'
        type='mail'
        placeholder='Email...'
        {...register('email', { required: true })}
      />
      <input
        className='text-input'
        type='password'
        placeholder='Password...'
        {...register('password', { required: true })}
      />
      <input type='submit' className='submit-button' />
    </form>
  );
};

export default AuthForm;
