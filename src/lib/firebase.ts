// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Firebase configuration from env (Gana Fácil) - CONFIGURACIÓN REAL
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBLl5wAu6mBb92ZOJw29VFW4ZJlkYEt3Bw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "gana-facil-rifa-d5609.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "gana-facil-rifa-d5609",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "gana-facil-rifa-d5609.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "428843376699",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:428843376699:web:0288ad0567b97b19e8bc1e",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-405FY60Y6J",
};

function isConfigValid(): boolean {
  try {
    const hasAll = Boolean(
      firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId
    );
    // Allow Firebase in development mode
    if (process.env.NODE_ENV === 'development') {
      return hasAll;
    }
    // Treat well-known demo placeholders as invalid to avoid runtime 400s
    const isDemo = (
      firebaseConfig.apiKey === 'demo_api_key' ||
      firebaseConfig.projectId === 'demo-project' ||
      firebaseConfig.messagingSenderId === '1234567890' ||
      (firebaseConfig.authDomain || '').startsWith('demo-project')
    );
    return hasAll && !isDemo;
  } catch {
    return false;
  }
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

if (isConfigValid()) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    
    // Initialize Analytics only in browser
    if (typeof window !== "undefined") {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[firebase] Initialization failed:', e);
    }
    app = null;
    db = null;
    auth = null;
    storage = null;
    analytics = null;
  }
} else {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[firebase] Firebase disabled (missing env or demo placeholders).');
  }
}

export const firebaseEnabled = !!app;
export { app, db, auth, storage, analytics, firebaseConfig };
export default app;
