// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdS571fLVgheO9-yfEVBlBs6wBTgduMbM",
  authDomain: "notion-clone-358cc.firebaseapp.com",
  projectId: "notion-clone-358cc",
  storageBucket: "notion-clone-358cc.firebasestorage.app",
  messagingSenderId: "410601925611",
  appId: "1:410601925611:web:de28e3462cff3ccb5a47ae",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
