// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEfgEaX6mMrNt85KsEPh48gQkWmgtHqEs",
    authDomain: "pentshi-mael.firebaseapp.com",
    projectId: "pentshi-mael",
    storageBucket: "pentshi-mael.appspot.com",
    messagingSenderId: "886735428611",
    appId: "1:886735428611:web:9a2d89d7d5f1eadc988236",
    measurementId: "G-3L975YN169"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();