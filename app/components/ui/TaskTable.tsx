'use client';
import React from 'react';
import TaskDeleteButton from './TaskDeleteButton';
import classes from './TaskTable.module.css';
import { Task } from '@/app/models/task.interface';
import { useRouter } from 'next/navigation';

const TaskTable = ({ taskList }: { taskList: Task[] }) => {
  const router = useRouter();

  const headers = [
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
          return (
            <tr
              key={task.id}
              className={`hover:bg-gray-300 cursor-pointer ${classes.round}`}
              onClick={() => router.push(`/task/${task.id}`)}
            >
              <td
                className={`p-4 ${
                  taskList.length === index + 1 ? classes.roundLeftCell : ''
                }`}
              >
                {task.name.slice(0, 20)}
                {task.name.length > 20 ? '...' : ''}
              </td>
              <td className='p-4'>
                {task.description.slice(0, 20)}
                {task.description.length > 20 ? '...' : ''}
              </td>
              <td className='p-4'>
                {task.creationDate.toDate().toDateString()}
              </td>
              <td className='p-4'>
                {task.modificationDate.toDate().toDateString()}
              </td>
              <td className='p-4'>{task.isDone ? 'Done' : 'In progress'}</td>
              <td
                className={`p-4 ${
                  taskList.length === index + 1 ? classes.roundRightCell : ''
                }`}
              >
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
