'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import TaskTable from './components/ui/TaskTable';
import TaskContext from './store/task-context';
import { Task } from './models/task.interface';
import { debounce } from './utils/debounce';

function HomePage() {
  const tasksCtx = useContext(TaskContext);
  const searchValue = useRef<string>('');
  const [taskList, setTaskList] = useState<Task[]>(tasksCtx.taskList);

  useEffect(() => {
    searchTaskByName(searchValue.current);
  }, [tasksCtx.taskList, tasksCtx.emitChanges]);

  function searchTaskByName(searchVal: string) {
    const arr = tasksCtx.taskList.filter((task) =>
      task.name.includes(searchVal)
    );

    setTaskList(arr);
  }

  const searchWithDebounce = debounce((searchVal: string) =>
    searchTaskByName(searchVal)
  );

  return (
    <>
      <div className='w-11/12 h-11/12 mx-auto'>
        <input
          className='text-input mt-12'
          type='text'
          placeholder='Search by name...'
          onChange={(e) => {
            const value = e.target.value;
            searchValue.current = value;
            return searchWithDebounce(value);
          }}
        />
      </div>

      <TaskTable taskList={taskList} />
    </>
  );
}

export default HomePage;
