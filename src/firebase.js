// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFPyK7OLC0SXhe97cyhNX0JQbC9IWyL00",
  authDomain: "zayne-project.firebaseapp.com",
  projectId: "zayne-project",
  storageBucket: "zayne-project.appspot.com",
  messagingSenderId: "874096038109",
  appId: "1:874096038109:web:5f1746d38ca11f1b064b34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
