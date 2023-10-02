import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDOUMRI6MGlw9niOmerC-8FQNgcpzH5Zlw",
  authDomain: "todo-list-6b0e7.firebaseapp.com",
  projectId: "todo-list-6b0e7",
  storageBucket: "todo-list-6b0e7.appspot.com",
  messagingSenderId: "638478636312",
  appId: "1:638478636312:web:992f27ed9ab7e6042a7a6d",
  measurementId: "G-BFGTG21F0R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();