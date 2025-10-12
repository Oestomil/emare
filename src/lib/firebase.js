import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "emare-4aab7.firebaseapp.com",
  projectId: "emare-4aab7",
  storageBucket: "emare-4aab7.firebasestorage.app",
  messagingSenderId: "149394074239",
  appId: "1:149394074239:web:8a3c1af2db85e946ae2d4a",
  measurementId: "G-Z4J0MB43D2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
