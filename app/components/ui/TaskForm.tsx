'use client';
import React, { useContext, useEffect, useRef } from 'react';
import FormTitle from './FormTitle';
import { useRouter } from 'next/navigation';
import { db } from '@/app/config/firebase';
import AuthContext from '@/app/store/auth-context';
import TaskContext from '@/app/store/task-context';
import { Timestamp, setDoc, doc, updateDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/app/models/task.interface';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  isEditing: boolean;
  taskId?: string;
}

interface Inputs {
  image: string;
  name: string;
  description: string;
}

const TaskForm = ({ isEditing, taskId }: Props) => {
  const saveNotification = () => toast('Task updated!');
  const editedTaskRef = useRef<Task | null>(null);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const tasksCtx = useContext(TaskContext);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (isEditing && taskId) {
      const task = tasksCtx.taskList.find((task) => task.id === taskId);

      if (task) {
        editedTaskRef.current = task;
        updateForm(editedTaskRef.current);
      }
    }
  }, [taskId]);

  useEffect(() => {
    register('description', { required: true });
  }, [register]);

  function updateForm(task: Task) {
    setValue('image', task.image ?? '');
    setValue('name', task.name);
    setValue('description', task.description);
  }

  const editorContent = watch('description');

  const onEditorStateChange = (editorState: string) => {
    setValue('description', editorState);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!authCtx.user) return;
    const id = editedTaskRef.current ? editedTaskRef.current.id : uuidv4();
    const task = {
      ...data,
      creationDate: editedTaskRef.current
        ? editedTaskRef.current.creationDate
        : Timestamp.fromDate(new Date()),
      modificationDate: Timestamp.fromDate(new Date()),
      isDone: false,
      id: id,
    };

    if (isEditing) {
      await updateDoc(
        doc(db, `users/${authCtx.user.uid}/tasks/${id}`),
        task
      ).then(() => {
        tasksCtx.updateTask(task);
        updateForm(task);
        saveNotification();
      });
    }

    if (!isEditing) {
      await setDoc(doc(db, `users/${authCtx.user.uid}/tasks/${id}`), task).then(
        () => {
          tasksCtx.addTask(task);
          router.push('/');
        }
      );
    }
  };

  return (
    <div className='form-container'>
      <FormTitle title={isEditing ? 'Edit Task' : 'Create Task'}></FormTitle>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='required'>
          <input
            className='text-input'
            placeholder='Image url... (optional)'
            {...register('image')}
          />
        </div>

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
          <ReactQuill
            placeholder='Description...'
            theme='snow'
            value={editorContent}
            onChange={onEditorStateChange}
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
