// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "spare-f7c4d.firebaseapp.com",
  projectId: "spare-f7c4d",
  storageBucket: "spare-f7c4d.appspot.com",
  messagingSenderId: "604492247443",
  appId: "1:604492247443:web:d2f8783ad3fd085789f866",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
