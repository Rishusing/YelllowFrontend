import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBoLr73KJJ8yq9PRa3RkyZLLaPs6rXSemk",
  authDomain: "assignments-14f60.firebaseapp.com",
  projectId: "assignments-14f60",
  storageBucket: "assignments-14f60.appspot.com",
  messagingSenderId: "801928893615",
  appId: "1:801928893615:web:6f940fe056332da350f05a",
  measurementId: "G-MDP9FPRJKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;