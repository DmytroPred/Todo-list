'use client';
import { Dispatch, PropsWithChildren, createContext, useState } from 'react';
import { Task } from '../models/task.interface';
import { Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface TaskContextType {
  taskList: Task[];
  taskTableView: boolean;
  setTaskTableView: Dispatch<boolean>;
  setTasks: Dispatch<Task[]>;
  addTask: Dispatch<Task>;
  updateTask: Dispatch<Task>;
  changeTaskStatus: Dispatch<ChangeStatus>;
  deleteTask: Dispatch<TaskLocationType>;
}

interface TaskLocationType {
  taskId: string;
  userId: string;
}

interface ChangeStatus extends TaskLocationType {
  doneStatus: boolean;
}

const TaskContext = createContext<TaskContextType>({
  taskList: [],
  taskTableView: true,
  setTaskTableView: () => {},
  setTasks: () => {},
  addTask: () => {},
  updateTask: () => {},
  changeTaskStatus: () => {},
  deleteTask: () => {},
});

export function TaskContextProvider(props: PropsWithChildren) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskTableView, setTaskTableView] = useState<boolean>(true);

  function setTasksHandler(tasks: Task[]): void {
    setTaskList(tasks);
  }

  async function addTaskHandler(task: Task): Promise<void> {
    setTaskList((prevValue: Task[]) => [task, ...prevValue]);
  }

  function updateTaskHandler(task: Task): void {
    setTaskList((prevValue: Task[]) => {
      const taskIndex = prevValue.findIndex((el) => el.id === task.id);

      const newArr: Task[] = [
        ...prevValue.slice(0, taskIndex),
        task,
        ...prevValue.slice(taskIndex + 1),
      ];

      return newArr;
    });
  }

  async function changeTaskStatusHandler({
    taskId,
    userId,
    doneStatus,
  }: ChangeStatus): Promise<void> {
    const modificationTime = Timestamp.now();

    await updateDoc(doc(db, `users/${userId}/tasks/${taskId}`), {
      isDone: doneStatus,
      modificationDate: modificationTime,
    }).then(() => {
      setTaskList((prevValue: Task[]) => {
        const updatedTaskIndex = prevValue.findIndex((el) => el.id === taskId);
        const task: Task = { ...prevValue[updatedTaskIndex] };

        task.isDone = doneStatus;
        task.modificationDate = modificationTime;

        const result: Task[] = [
          ...prevValue.slice(0, updatedTaskIndex),
          task,
          ...prevValue.slice(updatedTaskIndex + 1),
        ];

        return result;
      });
    });
  }

  async function deleteTaskHandler({
    taskId,
    userId,
  }: TaskLocationType): Promise<void> {
    await deleteDoc(doc(db, `users/${userId}/tasks/${taskId}`)).then(() => {
      setTaskList((prevValue: Task[]) =>
        prevValue.filter((task: Task) => task.id !== taskId)
      );
    });
  }

  function setTaskTableViewHandler(isTable: boolean): void {
    setTaskTableView(isTable);
  }

  const context: TaskContextType = {
    taskList: taskList,
    taskTableView: taskTableView,
    setTaskTableView: setTaskTableViewHandler,
    setTasks: setTasksHandler,
    addTask: addTaskHandler,
    updateTask: updateTaskHandler,
    changeTaskStatus: changeTaskStatusHandler,
    deleteTask: deleteTaskHandler,
  };

  return (
    <TaskContext.Provider value={context}>
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
