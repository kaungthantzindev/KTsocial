// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwvUxNOAxwFPII7jtYJJBM2_LpTvLRnH4",
  authDomain: "kt-social.firebaseapp.com",
  projectId: "kt-social",
  storageBucket: "kt-social.appspot.com",
  messagingSenderId: "574299118993",
  appId: "1:574299118993:web:f7cc29b68c53e70cb30e30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);