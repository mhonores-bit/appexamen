import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCd5Nn0JjUoJBCD4nfUg6vj4Z4xgsdyni8",
  authDomain: "examen-311e6.firebaseapp.com",
  projectId: "examen-311e6",
  storageBucket: "examen-311e6.firebasestorage.app",
  messagingSenderId: "741609460566",
  appId: "1:741609460566:web:73b2cea8efa77fd4db3cf7",
  measurementId: "G-TQ7PCKZ2E3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export { app, analytics };
