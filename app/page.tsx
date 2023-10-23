'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import TaskTable from './components/ui/TaskTable';
import TaskContext from './store/task-context';
import { Task } from './models/task.interface';
import { debounce } from './utils/debounce';
import TaskCard from './components/ui/TaskCard';

function HomePage() {
  const tasksCtx = useContext(TaskContext);
  const searchValue = useRef<string>('');
  const [taskList, setTaskList] = useState<Task[]>(tasksCtx.taskList);
  const defaultImage =
    'https://t4.ftcdn.net/jpg/01/31/15/51/360_F_131155172_4ZVdaT7YF5yJHqircjy59DDxV6aWFds9.jpg';

  useEffect(() => {
    searchTaskByName(searchValue.current);
  }, [tasksCtx.taskList]);

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
      <div className='w-11/12 h-11/12 mt-12 mx-auto flex justify-between'>
        <input
          className='text-input'
          type='text'
          placeholder='Search by name...'
          onChange={(e) => {
            const value = e.target.value;
            searchValue.current = value;
            return searchWithDebounce(value);
          }}
        />

        <div className='flex gap-x-1 bg-slate-200 rounded-full border'>
          <button
            className={`${
              tasksCtx.taskTableView && 'bg-gray-50'
            } rounded-full px-4`}
            onClick={() => tasksCtx.setTaskTableView(true)}
          >
            Table
          </button>
          <button
            className={`${
              !tasksCtx.taskTableView && 'bg-gray-50'
            } rounded-full px-4 `}
            onClick={() => tasksCtx.setTaskTableView(false)}
          >
            Cards
          </button>
        </div>
      </div>

      {tasksCtx.taskTableView ? (
        <TaskTable taskList={taskList} defaultImageUrl={defaultImage} />
      ) : (
        <div className='mt-6 mb-12 w-11/12 h-11/12 mx-auto flex flex-wrap gap-8'>
          {taskList.map((task) => {
            return (
              <TaskCard
                key={task.id}
                task={task}
                defaultImageUrl={defaultImage}
              ></TaskCard>
            );
          })}
        </div>
      )}
    </>
  );
}

export default HomePage;
