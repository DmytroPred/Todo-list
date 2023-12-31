import AuthContext from '@/app/store/auth-context';
import TaskContext from '@/app/store/task-context';
import { User } from 'firebase/auth';
import React, { useContext } from 'react';

const TaskDeleteButton = ({ deleteTaskId }: { deleteTaskId: string }) => {
  const tasksCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);

  return (
    <button
      className='hover:bg-red-600 bg-red-500 text-white rounded-full py-1 px-3'
      onClick={(e) => {
        e.stopPropagation();
        tasksCtx.deleteTask({
          taskId: deleteTaskId,
          userId: (authCtx.user as User).uid,
        });
      }}
    >
      Delete
    </button>
  );
};

export default TaskDeleteButton;
