"use client";

import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import app, { auth, db, firebaseEnabled } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function PushNotifications() {
  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseEnabled || !app || !auth) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUid(user.uid);
        } else {
          // No auto anonymous sign-in to avoid 400 if disabled on Firebase
          setUid(null);
        }
      } catch {
        setUid(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!firebaseEnabled || !app || !auth || !db) return;
        if (!uid) return;
        if (!(await isSupported())) return;
        if (!('Notification' in window)) return;
        if (Notification.permission !== 'granted') return;
        const messaging = getMessaging(app);
        // Try to use the existing sw registration
        const reg = await navigator.serviceWorker.getRegistration('/sw.js');
        const vapidKey = process.env.NEXT_PUBLIC_FCM_VAPID_KEY;
        if (!vapidKey) return;
        const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: reg ?? undefined });
        if (token && uid) {
          await setDoc(doc(db, 'users', uid, 'tokens', token), {
            token,
            createdAt: serverTimestamp(),
            ua: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          }, { merge: true });
          setReady(true);
        }
        onMessage(messaging, (payload) => {
          try {
            const title = payload?.notification?.title || 'Migrantes UK';
            const body = payload?.notification?.body || 'Actualización disponible.';
            // Simple in-app alert for foreground messages
            alert(`${title}: ${body}`);
          } catch {}
        });
      } catch (e) {
        // ignore
      }
    })();
  }, [uid]);

  return null;
}



