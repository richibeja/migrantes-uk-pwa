// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Firebase configuration from env (Gana Fácil)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

if (isConfigValid()) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[firebase] Initialization failed:', e);
    }
    app = null;
    db = null;
    auth = null;
    storage = null;
  }
} else {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[firebase] Firebase disabled (missing env or demo placeholders).');
  }
}

export const firebaseEnabled = !!app;
export { app, db, auth, storage };
export default app;
