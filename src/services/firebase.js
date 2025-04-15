import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJBqoV2IbmgHPZWsbMGP5iyyy1uCexqMU",
  authDomain: "zaio--clone-1f5bd.firebaseapp.com",
  projectId: "zaio--clone-1f5bd",
  storageBucket: "zaio--clone-1f5bd.firebasestorage.app",
  messagingSenderId: "528594066690",
  appId: "1:528594066690:web:34ada0a57176f62c64761b",
  measurementId: "G-EGG7B5WDMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);