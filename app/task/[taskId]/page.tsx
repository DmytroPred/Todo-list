'use client';
import TaskForm from '@/app/components/ui/TaskForm';
import { db } from '@/app/config/firebase';
import { Task } from '@/app/models/task.interface';
import AuthContext from '@/app/store/auth-context';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';

const EditTaskPage = (props: { params: { taskId: string } }) => {
  const [task, setTask] = useState<Task>();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchTaskById() {
      const taskDoc: Task = (
        await getDoc(
          doc(db, `users/${authCtx.user?.uid}/tasks/${props.params.taskId}`)
        )
      ).data() as Task;

      setTask(taskDoc);
    }

    fetchTaskById();
  }, []);

  return <TaskForm isEditing={true} taskId={task?.id} />;
};

export default EditTaskPage;
