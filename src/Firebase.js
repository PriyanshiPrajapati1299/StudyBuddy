import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8TRK75Y1Ej3cAdzab_1wwydDFLjCum54",
  authDomain: "studybuddy-4112a.firebaseapp.com",
  projectId: "studybuddy-4112a",
  storageBucket: "studybuddy-4112a.appspot.com",
  messagingSenderId: "677614720242",
  appId: "1:677614720242:web:c410f8bb42379ddc5b6c6b",
  measurementId: "G-L0TMX2ZD6B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);