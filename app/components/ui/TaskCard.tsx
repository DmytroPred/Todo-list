import { Task } from '@/app/models/task.interface';
import Link from 'next/link';
import React from 'react';

const TaskCard = ({ task }: { task: Task }) => {
  console.log(task);
  return (
    <Link href={`/task/${task.id}`}>
      <div className='bg-stone-100 rounded-2xl w-80'>
        <img
          className='rounded-t-2xl h-28 object-cover w-full'
          src='https://t4.ftcdn.net/jpg/01/31/15/51/360_F_131155172_4ZVdaT7YF5yJHqircjy59DDxV6aWFds9.jpg'
          alt='task'
        />
        <div className='px-4 pt-2 pb-4 flex justify-between items-center'>
          <div>
            <span className='text-xl font-bold'>
              {task.name.slice(0, 20)}
              {task.name.length > 20 ? '...' : ''}
            </span>
            <br />
            <span>
              {task.description.slice(0, 20)}
              {task.description.length > 20 ? '...' : ''}
            </span>
          </div>
          <div
            className={`${
              task.isDone ? 'bg-orange-600' : 'bg-green-600'
            } w-6 h-6 rounded-full`}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
