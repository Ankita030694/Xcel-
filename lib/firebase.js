import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAERoD0IFG6y-xHmCdK-Ssd7MCQYAjo1qM",
  authDomain: "xcell-ae678.firebaseapp.com",
  projectId: "xcell-ae678",
  storageBucket: "xcell-ae678.firebasestorage.app",
  messagingSenderId: "449758490200",
  appId: "1:449758490200:web:d2b3642142ad5fcc02e42d",
  measurementId: "G-WYZMS38PFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export const db = getFirestore(app);
export const auth = getAuth(app);