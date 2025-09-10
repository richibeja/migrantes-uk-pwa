import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, getDocs, query, orderBy } from 'firebase/firestore';

export interface CloudCode {
  code: string;
  used: boolean;
  usedBy?: string | null;
  createdAt?: any;
  usedAt?: any;
}

export async function createCloudCode(code: string): Promise<void> {
  const normalized = (code || '').trim().toUpperCase();
  const ref = doc(db!, 'codes', normalized);
  await setDoc(ref, {
    code: normalized,
    used: false,
    usedBy: null,
    createdAt: serverTimestamp(),
    usedAt: null,
  }, { merge: true });
}

export async function checkCloudCode(code: string): Promise<{ exists: boolean; used: boolean; }>
{
  const normalized = (code || '').trim().toUpperCase();
  const ref = doc(db!, 'codes', normalized);
  const snap = await getDoc(ref);
  if (!snap.exists()) return { exists: false, used: false };
  const data = snap.data() as any;
  return { exists: true, used: Boolean(data.used) };
}

export async function markCloudCodeUsed(code: string, username: string): Promise<void> {
  const normalized = (code || '').trim().toUpperCase();
  const ref = doc(db!, 'codes', normalized);
  await updateDoc(ref, {
    used: true,
    usedBy: username || null,
    usedAt: serverTimestamp(),
  });
}

export async function listCloudCodes(): Promise<CloudCode[]> {
  const ref = collection(db!, 'codes');
  const q = query(ref, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...(d.data() as any) })) as CloudCode[];
}



