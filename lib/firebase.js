import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase safely without duplicate-app error in Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Gracefully ignore analytics support failures on restricted browsers
    });
}

// Force long polling to fix iOS / Safari WebKit WebChannel connection drop issue
/** @type {any} */
let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (e) {
  dbInstance = getFirestore(app);
}

export const db = dbInstance;
export const auth = getAuth(app);
export const storage = getStorage(app);
export { app };
