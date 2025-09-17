// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-5106171037-2523b",
  "appId": "1:81457009364:web:abcc35f992e3b7d8b16141",
  "storageBucket": "studio-5106171037-2523b.firebasestorage.app",
  "apiKey": "AIzaSyAWUVFxmCw_sOrEWBvNx-pEq6ZtqB06Dqs",
  "authDomain": "studio-5106171037-2523b.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "81457009364"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
