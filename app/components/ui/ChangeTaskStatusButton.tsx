import AuthContext from '@/app/store/auth-context';
import TaskContext from '@/app/store/task-context';
import { User } from 'firebase/auth';
import React, { useContext } from 'react';

const ChangeTaskStatusButton = ({
  taskId,
  isDone,
}: {
  taskId: string;
  isDone: boolean;
}) => {
  const tasksCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        tasksCtx.changeTaskStatus({
          userId: (authCtx.user as User).uid,
          taskId,
          doneStatus: !isDone,
        });
      }}
      className={`text-white rounded-full py-1 px-3 ${
        isDone
          ? 'hover:bg-green-700 bg-green-600'
          : 'hover:bg-blue-700 bg-blue-600'
      }`}
    >
      {isDone ? 'Done' : 'In progress'}
    </button>
  );
};

export default ChangeTaskStatusButton;
