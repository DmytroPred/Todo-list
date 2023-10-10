'use client';
import { PropsWithChildren, useContext, useEffect } from 'react';
import Header from './Header';
import AuthContext, { AuthContextType } from '@/app/store/auth-context';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/app/config/firebase';
import { useRouter } from 'next/navigation';
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from 'firebase/firestore';
import TaskContext, { TaskContextType } from '@/app/store/task-context';
import { Task } from '@/app/models/task.interface';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const authCtx = useContext<AuthContextType>(AuthContext);
  const tasksCtx = useContext<TaskContextType>(TaskContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      authCtx.setUser(user);
      authCtx.setIsAuthenticated(user);
      authGuard(user);

      if (user?.uid) {
        getTaskList(user.uid);
      } else {
        tasksCtx.setTasks([]);
      }
    });
  }, []);

  function getTaskList(userId: string): void {
    const taskCollectionRef = collection(db, `users/${userId}/tasks`);

    fetchTasks(taskCollectionRef);
  }

  const fetchTasks = async (
    taskRef: CollectionReference<DocumentData, DocumentData>
  ) => {
    try {
      const docs = await getDocs(taskRef);
      const data = docs.docs
        .map((doc) => ({ ...doc.data() } as Task))
        .sort(
          (a: Task, b: Task) =>
            b.creationDate.toMillis() - a.creationDate.toMillis()
        );

      tasksCtx.setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  function authGuard(user: User | null): void {
    user ? router.push('/') : router.push('/sign-in');
  }

  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
