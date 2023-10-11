'use client';
import { useContext, useEffect, useState } from 'react';
import TaskTable from './components/ui/TaskTable';
import TaskContext from './store/task-context';
import { Task } from './models/task.interface';
import { debounce } from './utils/debounce';

function HomePage() {
  const tasksCtx = useContext(TaskContext);
  const [taskList, setTaskList] = useState<Task[]>(tasksCtx.taskList);

  useEffect(() => {
    setTaskList(tasksCtx.taskList);
  }, [tasksCtx.taskList]);

  function searchTaskByName(event: React.ChangeEvent<HTMLInputElement>) {
    const arr = tasksCtx.taskList.filter((task) =>
      task.name.includes(event.target.value)
    );

    setTaskList(arr);
  }

  const searchWithDebounce = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => searchTaskByName(e)
  );

  return (
    <>
      <div className='w-11/12 h-11/12 mx-auto'>
        <input
          className='text-input mt-12'
          type='text'
          placeholder='Search by name...'
          onChange={(e) => searchWithDebounce(e)}
        />
      </div>

      <TaskTable taskList={taskList} />
    </>
  );
}

export default HomePage;
