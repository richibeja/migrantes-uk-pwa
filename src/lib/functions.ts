import app from '@/lib/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = app ? getFunctions(app) : null as any;

export async function reserveUserCodeCallable(): Promise<string | null> {
  try {
    if (!functions) return null;
    const fn = httpsCallable(functions, 'reserveUserCode');
    const res: any = await fn({});
    return res?.data?.code || null;
  } catch {
    return null;
  }
}

export async function reserveCaseCodeCallable(caseId: string): Promise<string | null> {
  try {
    if (!functions) return null;
    const fn = httpsCallable(functions, 'reserveCaseCode');
    const res: any = await fn({ caseId });
    return res?.data?.code || null;
  } catch {
    return null;
  }
}


