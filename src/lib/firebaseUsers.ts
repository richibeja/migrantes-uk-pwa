import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, getDocs, query, orderBy } from 'firebase/firestore';

export type CloudUserStatus = 'pending' | 'active';
export type CloudUserPlan = 'basic' | 'premium' | 'vip' | 'lifetime' | null;

export interface CloudUser {
  username: string;
  password?: string;
  phone?: string | null;
  status: CloudUserStatus;
  plan: CloudUserPlan;
  expiresAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export async function createCloudUser(user: CloudUser): Promise<void> {
  const ref = doc(db, 'users', user.username);
  await setDoc(ref, {
    username: user.username,
    password: user.password || '',
    phone: user.phone || null,
    status: user.status,
    plan: user.plan || null,
    expiresAt: user.expiresAt || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getCloudUser(username: string): Promise<CloudUser | null> {
  const ref = doc(db, 'users', username);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return {
    username: data.username,
    password: data.password || '',
    phone: data.phone || null,
    status: (data.status as CloudUserStatus) || 'pending',
    plan: (data.plan as CloudUserPlan) || null,
    expiresAt: data.expiresAt || null,
    createdAt: data.createdAt?.toDate?.().toISOString?.() || null,
    updatedAt: data.updatedAt?.toDate?.().toISOString?.() || null,
  };
}

export async function updateCloudUserActivation(username: string, status: CloudUserStatus, plan: CloudUserPlan, expiresAt: string | null): Promise<void> {
  const ref = doc(db, 'users', username);
  await updateDoc(ref, {
    status,
    plan: plan || null,
    expiresAt: expiresAt || null,
    updatedAt: serverTimestamp(),
  });
}

export async function listCloudUsers(): Promise<CloudUser[]> {
  const ref = collection(db, 'users');
  const q = query(ref, orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data() as any;
    return {
      username: data.username,
      password: data.password || '',
      phone: data.phone || null,
      status: (data.status as CloudUserStatus) || 'pending',
      plan: (data.plan as CloudUserPlan) || null,
      expiresAt: data.expiresAt || null,
      createdAt: data.createdAt?.toDate?.().toISOString?.() || null,
      updatedAt: data.updatedAt?.toDate?.().toISOString?.() || null,
    } as CloudUser;
  });
}



