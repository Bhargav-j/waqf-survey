// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAv5o0pmNTP8TlYYohOIbX1q5ac-wqVPL4",

  authDomain: "waqfproject-237c2.firebaseapp.com",

  projectId: "waqfproject-237c2",

  storageBucket: "waqfproject-237c2.appspot.com",

  messagingSenderId: "780421481597",

  appId: "1:780421481597:web:6c8c81aaa4ca5ce05b9d14",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider(app);

export { auth, googleProvider, db };
