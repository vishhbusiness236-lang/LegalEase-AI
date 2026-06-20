import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPLlO9bKuAfO8ds9AVcP6pdmen32ZXXIQ",
  authDomain: "spheric-ruler-s9fkf.firebaseapp.com",
  projectId: "spheric-ruler-s9fkf",
  storageBucket: "spheric-ruler-s9fkf.firebasestorage.app",
  messagingSenderId: "855553975929",
  appId: "1:855553975929:web:c9f8b2a2095dc02df8d6a8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
