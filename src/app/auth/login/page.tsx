'use client';

import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { reserveUserCodeForUid } from '@/lib/codes';
import { reserveUserCodeCallable } from '@/lib/functions';
import BackNav from '@/components/BackNav';

export default function AuthLoginPage() {
  return (
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Completar login si venimos de signInWithRedirect
  React.useEffect(() => {
    (async () => {
      try {
        const res = await getRedirectResult(auth!);
        if (res?.user) {
          await postLoginSetup(res.user.uid);
          router.push('/dashboard');
        }
      } catch {}
    })();
  }, [router]);

  async function postLoginSetup(uid: string) {
    const userRef = doc(db!, 'users', uid);
    const snap = await getDoc(userRef);
    let userCode = snap.data()?.userCode as string | undefined;
    if (!userCode) {
      try {
        userCode = (await reserveUserCodeCallable()) || await reserveUserCodeForUid(uid);
        await setDoc(userRef, { userCode }, { merge: true });
      } catch {}
    }
    try {
      const profileSnap = await getDoc(userRef);
      const u = profileSnap.exists() ? profileSnap.data() as any : {};
      const account = {
        username: u?.email || 'user',
        name: u?.name || '',
        phone: u?.phone || '',
        status: 'active',
        plan: u?.plan || 'free',
        expiresAt: u?.expiresAt || null,
        userCode: userCode || u?.userCode || ''
      } as any;
      localStorage.setItem('ganaFacilUser', JSON.stringify(account));
    } catch {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth!, email, password);
      await postLoginSetup(cred.user.uid);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    try {
      setError(''); setLoading(true);
      const provider = new GoogleAuthProvider();
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
      if (isIOS || isSafari) {
        await signInWithRedirect(auth!, provider);
        return;
      }
      try {
        const cred = await signInWithPopup(auth!, provider);
        await postLoginSetup(cred.user.uid);
        router.push('/dashboard');
      } catch (e: any) {
        // Fallback si el popup fue bloqueado
        const code = e?.code || '';
        if (String(code).includes('popup') || String(code).includes('blocked')) {
          await signInWithRedirect(auth!, provider);
          return;
        }
        throw e;
      }
    } catch (e: any) {
      setError(e?.message || 'Error con Google');
    } finally {
      setLoading(false);
    }
  }

    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gold">Iniciar sesión</h1>
        {error && <div className="text-sm text-red-400">{error}</div>}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" autoComplete="email" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" autoComplete="current-password" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" required />
        </div>
        <button disabled={loading} className="w-full bg-gold text-black font-semibold py-2 rounded disabled:opacity-60">{loading?'Entrando…':'Entrar'}</button>
        <div className="text-sm text-gray-400">¿No tienes cuenta? <a href="/auth/register" className="text-gold underline">Regístrate</a></div>
        <div className="pt-2">
          <button type="button" onClick={loginWithGoogle} className="w-full bg-white text-black font-semibold py-2 rounded border border-gray-300">Continuar con Google</button>
        </div>
      </form>
      </div>
    </div>
  );
}


