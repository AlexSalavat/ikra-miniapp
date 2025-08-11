// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'ТВОЙ_API_KEY',
  authDomain: 'ТВОЙ_AUTH_DOMAIN',
  projectId: 'ТВОЙ_PROJECT_ID',
  storageBucket: 'ТВОЙ_STORAGE_BUCKET',
  messagingSenderId: 'ТВОЙ_MSG_ID',
  appId: 'ТВОЙ_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
