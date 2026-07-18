// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "devdocs-50bfa.firebaseapp.com",
  projectId: "devdocs-50bfa",
  storageBucket: "devdocs-50bfa.firebasestorage.app",
  messagingSenderId: "555402787696",
  appId: "1:555402787696:web:3646348a81325f233aedb5"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider };