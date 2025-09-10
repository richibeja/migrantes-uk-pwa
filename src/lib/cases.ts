import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { Case } from '@/models/Case';

export async function createCase(data: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const ref = doc(db as any, 'cases', id);
  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return id;
}






