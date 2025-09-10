import { db } from '@/lib/firebase';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';

const ALPHANUM = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // sin 0,O,1,I

function randomSuffix(length: number): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
  }
  return out;
}

export function generateUserCode(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const suffix = randomSuffix(4 + Math.floor(Math.random() * 3)); // 4-6
  return `UKU-${y}${m}-${suffix}`;
}

export function generateCaseCode(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const suffix = randomSuffix(4 + Math.floor(Math.random() * 3));
  return `UKC-${y}${m}${d}-${suffix}`;
}

export async function reserveUserCodeForUid(uid: string): Promise<string> {
  // Fallback inmediato si Firestore no está disponible
  if (!db) {
    return generateUserCode();
  }
  let attempts = 0;
  while (attempts < 6) {
    attempts++;
    const candidate = generateUserCode();
    try {
      const codeRef = doc(db!, 'indexes', 'userCodes', candidate, 'meta');
      await runTransaction(db!, async (tx) => {
        const snap = await tx.get(codeRef);
        if (snap.exists()) throw new Error('collision');
        tx.set(codeRef, { uid, createdAt: serverTimestamp() });
      });
      return candidate;
    } catch (e: any) {
      // Si es colisión, reintentar con otro código
      if (e && typeof e.message === 'string' && e.message.includes('collision')) {
        continue;
      }
      // Si son permisos/quotas/offline u otro error, devolver código sin reservar para no bloquear el alta
      const msg = String(e?.message || '');
      if (
        (e && typeof e.code === 'string' && e.code.includes('permission')) ||
        msg.includes('Missing or insufficient permissions') ||
        msg.includes('PERMISSION_DENIED') ||
        msg.includes('quota') ||
        msg.includes('network') ||
        msg.includes('Failed to get document')
      ) {
        return candidate;
      }
      // Otros errores: intentar un par de veces más y luego fallback
      if (attempts >= 3) {
        return candidate;
      }
    }
  }
  // Último recurso: generar sin reserva
  return generateUserCode();
}

export async function reserveCaseCodeForCase(caseId: string, uid: string): Promise<string> {
  let attempts = 0;
  while (attempts < 10) {
    attempts++;
    const candidate = generateCaseCode();
    try {
      const codeRef = doc(db!, 'indexes', 'caseCodes', candidate, 'meta');
      await runTransaction(db!, async (tx) => {
        const snap = await tx.get(codeRef);
        if (snap.exists()) throw new Error('collision');
        tx.set(codeRef, { caseId, uid, createdAt: serverTimestamp() });
      });
      return candidate;
    } catch (e) {
      // retry on collision
    }
  }
  throw new Error('No fue posible reservar CASE_CODE');
}


