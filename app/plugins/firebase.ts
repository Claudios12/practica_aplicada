// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6ssBUVBs3T7x67df8U0A1LCQ-DS8wn-M",
  authDomain: "serenapp-d1bc1.firebaseapp.com",
  databaseURL: "https://serenapp-d1bc1-default-rtdb.firebaseio.com",
  projectId: "serenapp-d1bc1",
  storageBucket: "serenapp-d1bc1.firebasestorage.app",
  messagingSenderId: "901292441523",
  appId: "1:901292441523:web:4a27738208293f6d58d5c6",
  measurementId: "G-QQLJYHNC0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);