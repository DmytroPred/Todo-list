import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  creationDate: Timestamp;
  description: string;
  isDone: boolean;
  modificationDate: Timestamp;
  name: string;
}