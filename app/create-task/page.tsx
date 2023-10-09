'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormTitle from '../components/ui/FormTitle';

interface Inputs {
  name: string;
  description: string;
}

const CreateTaskPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='form-container'>
      <FormTitle title='Create Task'></FormTitle>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='required'>
          <input
            className='text-input'
            placeholder='Name...'
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className='form-error'>Name field is required</span>
          )}
        </div>

        <div className='required'>
          <textarea
            className='px-5 py-3 text-lg rounded-2xl border-2'
            placeholder='Description...'
            {...register('description', { required: true })}
          />
          {errors.description && (
            <span className='form-error'>Description field is required</span>
          )}
        </div>

        <input type='submit' className='submit-button' />
      </form>
    </div>
  );
};

export default CreateTaskPage;
