 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHV1umEp_YoglLAC-B4HMyFRTVGaIPrP0",
  authDomain: "portfolio-4d258.firebaseapp.com",
  projectId: "portfolio-4d258",
  storageBucket: "portfolio-4d258.firebasestorage.app",
  messagingSenderId: "260391089974",
  appId: "1:260391089974:web:ffae5d505b690ae40ee597",
  measurementId: "G-8L68FERF3Z",
  databaseURL: "https://console.firebase.google.com/u/0/project/portfolio-4d258/database/portfolio-4d258-default-rtdb/data/~2F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);