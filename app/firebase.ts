// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
const firebaseConfig = {
 apiKey: "AIzaSyD6ssBUVBs3T7x67df8U0A1LCQ-DS8wn-M",
  authDomain: "serenapp-d1bc1.firebaseapp.com",
  databaseURL: "https://serenapp-d1bc1-default-rtdb.firebaseio.com",
  projectId: "serenapp-d1bc1",
  storageBucket: "serenapp-d1bc1.firebasestorage.app",
  messagingSenderId: "901292441523",
  appId: "1:901292441523:web:edaae3a8cfa147bf58d5c6",
  measurementId: "G-6FB5S7Z23D"
    };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
 const auth = getAuth(app);

 
  return {
    provide: {
      db, // esto lo hace accesible como $db
      auth, // esto lo hace accesible como $auth
    },
  };
});