'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Link from 'next/link';
import BackNav from '@/components/BackNav';

type CaseItem = { id: string; title: string; status: string; caseCode?: string; createdAt?: any };

export default function CasesListPage() {
  const [uid, setUid] = useState<string | null>(null);
  const [items, setItems] = useState<CaseItem[]>([]);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => setUid(u?.uid || null));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, 'cases'), where('uid', '==', uid), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, [uid]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-3"><BackNav /></div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gold">Mis trámites</h1>
        <Link href="/cases/new" className="bg-gold text-black px-4 py-2 rounded font-semibold">Nuevo trámite</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(it => (
          <Link key={it.id} href={`/cases/${it.id}`} className="block bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-gold/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-100 font-semibold">{it.title || 'Trámite'}</div>
                <div className="text-xs text-gray-400">Estado: {it.status}</div>
                {it.caseCode && (
                  <div className="text-xs text-gray-400 mt-1">CASE_CODE: <span className="font-mono">{it.caseCode}</span></div>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${it.status==='pagado'?'bg-green-700/50 border border-green-500/50':'bg-yellow-700/40 border border-yellow-500/40'}`}>{it.status}</span>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}


