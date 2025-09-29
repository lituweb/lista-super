// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRKHMfS_9yjQLxKtT6DQWcgz8SPsKxM-o",
  authDomain: "superlista-3fc9e.firebaseapp.com",
  projectId: "superlista-3fc9e",
  storageBucket: "superlista-3fc9e.firebasestorage.app",
  messagingSenderId: "744936847237",
  appId: "1:744936847237:web:deca2a988b685f98f2f6ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);