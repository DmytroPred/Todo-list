'use client';
import React from 'react';
import TaskDeleteButton from './TaskDeleteButton';
import classes from './TaskTable.module.css';
import { Task } from '@/app/models/task.interface';
import { useRouter } from 'next/navigation';
import ChangeTaskStatusButton from './ChangeTaskStatusButton';

const TaskTable = ({
  taskList,
  defaultImageUrl,
}: {
  taskList: Task[];
  defaultImageUrl: string;
}) => {
  const router = useRouter();

  const headers = [
    '',
    'Name',
    'Description',
    'Creation Date',
    'Modification Date',
    'Status',
    'Action',
  ];

  return (
    <table className='mt-6 mb-12 border-separate border-spacing-0 border rounded-2xl w-11/12 h-11/12 mx-auto'>
      <thead>
        <tr className='text-left row-container'>
          {headers.map((header) => {
            return (
              <th key={header} className='p-4'>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {taskList.map((task: Task, index: number) => {
          const lastItem = taskList.length === index + 1;
          const creationDate = task.creationDate.toDate();
          const modDate = task.modificationDate.toDate();

          return (
            <tr
              key={task.id}
              className={`hover:bg-gray-300 cursor-pointer ${classes.round}`}
              onClick={() => router.push(`/task/${task.id}`)}
            >
              <td className={`p-4 ${lastItem ? classes.roundLeftCell : ''}`}>
                <img
                  className='rounded-2xl h-12 object-cover w-full'
                  src={task.image || defaultImageUrl}
                  alt='task'
                />
              </td>
              <td>
                {task.name.slice(0, 20)}
                {task.name.length > 20 ? '...' : ''}
              </td>
              <td className='p-4'>
                <span
                  className='inline'
                  dangerouslySetInnerHTML={{
                    __html: task.description.slice(0, 20),
                  }}
                ></span>
              </td>
              <td className='p-4'>
                {creationDate.getDate()}/{creationDate.getMonth() + 1}/
                {creationDate.getFullYear()}
              </td>
              <td className='p-4'>
                {modDate.getDate()}/{modDate.getMonth() + 1}/
                {modDate.getFullYear()}
              </td>
              <td className='p-4'>
                <ChangeTaskStatusButton isDone={task.isDone} taskId={task.id} />
              </td>
              <td className={`p-4 ${lastItem ? classes.roundRightCell : ''}`}>
                <TaskDeleteButton deleteTaskId={task.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskTable;
