'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { reserveCaseCodeForCase } from '@/lib/codes';
import { reserveCaseCodeCallable } from '@/lib/functions';
import Link from 'next/link';
import BackNav from '@/components/BackNav';

export default function NewCasePage() {
  const [uid, setUid] = useState<string | null>(null);
  const [title, setTitle] = useState('Carta de apoyo');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [docType, setDocType] = useState('letter');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
    return () => unsub();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!uid) { setError('Inicia sesión'); return; }
    setSubmitting(true);
    setError('');
    try {
      const ref = await addDoc(collection(db, 'cases'), {
        uid,
        title,
        city,
        state,
        docType,
        status: 'borrador',
        createdAt: serverTimestamp(),
      });
      const caseCode = (await reserveCaseCodeCallable(ref.id)) || await reserveCaseCodeForCase(ref.id, uid);
      await setDoc(doc(db, 'cases', ref.id), { caseCode }, { merge: true });
      window.location.href = `/cases/${ref.id}`;
    } catch (e: any) {
      setError(e?.message || 'Error creando trámite');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-2xl font-bold text-gold mb-4">Nuevo trámite</h1>
      {error && <div className="text-sm text-red-400 mb-2">{error}</div>}
      <form onSubmit={handleCreate} className="max-w-xl space-y-4 bg-gray-900 border border-gray-700 p-4 rounded-xl">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Título</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Ciudad</label>
            <input value={city} onChange={(e)=>setCity(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Estado/Condado</label>
            <input value={state} onChange={(e)=>setState(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Tipo</label>
          <select value={docType} onChange={(e)=>setDocType(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2">
            <option value="letter">Carta</option>
            <option value="form">Formulario migratorio</option>
            <option value="contract">Contrato básico</option>
          </select>
        </div>
        <button disabled={submitting} className="bg-gold text-black font-semibold px-4 py-2 rounded disabled:opacity-60">{submitting?'Creando…':'Crear trámite'}</button>
        <Link href="/cases" className="ml-2 text-gold underline">Cancelar</Link>
      </form>
    </div>
  );
}


