'use client';
import { Dispatch, PropsWithChildren, createContext, useState } from 'react';
import { Task } from '../models/task.interface';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface TaskContextType {
  taskList: Task[];
  setTasks: Dispatch<Task[]>;
  addTask: Dispatch<Task>;
  updateTask: Dispatch<Task>;
  deleteTask: Dispatch<DeleteTaskDispatchType>;
}

interface DeleteTaskDispatchType {
  taskId: string;
  userId: string;
}

const TaskContext = createContext<TaskContextType>({
  taskList: [],
  setTasks: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export function TaskContextProvider(props: PropsWithChildren) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  function setTasksHandler(tasks: Task[]): void {
    setTaskList(tasks);
  }

  async function addTaskHandler(task: Task): Promise<void> {
    setTaskList((prevValue: Task[]) => {
      prevValue.unshift(task);
      return prevValue;
    });
  }

  function updateTaskHandler(task: Task) {
    setTaskList((prevValue: Task[]) => {
      const taskIndex = prevValue.findIndex((el) => el.id === task.id);
      prevValue[taskIndex] = task;
      return prevValue;
    });
  }

  async function deleteTaskHandler({
    taskId,
    userId,
  }: DeleteTaskDispatchType): Promise<void> {
    await deleteDoc(doc(db, `users/${userId}/tasks/${taskId}`)).then(() => {
      setTaskList((prevValue: Task[]) => {
        const tasks = prevValue;

        return tasks.filter((task: Task) => task.id !== taskId);
      });
    });
  }

  const context: TaskContextType = {
    taskList: taskList,
    setTasks: setTasksHandler,
    addTask: addTaskHandler,
    updateTask: updateTaskHandler,
    deleteTask: deleteTaskHandler,
  };

  return (
    <TaskContext.Provider value={context}>
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
