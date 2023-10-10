import React, { useContext } from 'react';
import FormTitle from './FormTitle';
import { useRouter } from 'next/navigation';
import { db } from '@/app/config/firebase';
import AuthContext from '@/app/store/auth-context';
import TaskContext from '@/app/store/task-context';
import { Timestamp, setDoc, doc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/app/models/task.interface';

interface Props {
  isEditing: boolean;
  task?: Task;
}

interface Inputs {
  name: string;
  description: string;
}

const TaskForm = ({ isEditing, task }: Props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const tasksCtx = useContext(TaskContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!authCtx.user) return;
    const id = uuidv4();
    const task = {
      ...data,
      creationDate: Timestamp.fromDate(new Date()),
      modificationDate: Timestamp.fromDate(new Date()),
      isDone: false,
      id: id,
    };

    await setDoc(doc(db, `users/${authCtx.user.uid}/tasks/${id}`), task).then(
      () => {
        tasksCtx.addTask(task);
        router.push('/');
      }
    );
  };

  return (
    <div className='form-container'>
      <FormTitle title={isEditing ? 'Edit Task' : 'Create Task'}></FormTitle>
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

export default TaskForm;
