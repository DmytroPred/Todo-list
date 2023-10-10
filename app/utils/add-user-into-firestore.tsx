import { UserCredential } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const addUserIntoFirestore = async (
  result: UserCredential,
  authWithGoogle: boolean = false
): Promise<void> => {
  let isUserInFirestore = false;
  const user = result.user;

  if (authWithGoogle) {
    const findUserViaIdQuery = query(
      collection(db, 'users'),
      where('userId', '==', user.uid)
    );
    (await getDocs(findUserViaIdQuery)).forEach(
      (doc) => (isUserInFirestore = !!doc.data())
    );
  }

  if (isUserInFirestore) return;

  await setDoc(doc(db, `users/${user.uid}`), {
    email: user.email,
    userId: user.uid,
  });
};
