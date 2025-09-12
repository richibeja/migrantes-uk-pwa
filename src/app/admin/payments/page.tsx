'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from 'firebase/firestore';
import BackNav from '@/components/BackNav';

export default function AdminPaymentsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubAuth = auth && auth.onAuthStateChanged(async (u) => {
      if (!u) { setIsAdmin(false); return; }
      // Asumimos claim admin en token; para demo permitimos acceso directo
      try {
        const token = await u.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
      } catch { setIsAdmin(false); }
    });
    
    return () => {
      if (unsubAuth) unsubAuth();
    };
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db!, 'payments'), orderBy('createdAt','desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, [isAdmin]);

  async function setStatus(id: string, status: 'validated'|'rejected') {
    await updateDoc(doc(db!, 'payments', id), { status });
    alert(status === 'validated' ? 'Pago validado' : 'Pago rechazado');
  }

  if (!isAdmin) {
    return <div className="min-h-screen bg-black text-white p-6 md:p-10">Acceso restringido</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-2xl font-bold text-gold mb-4">Pagos (Admin)</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map(it => (
          <div key={it.id} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-300">UID: <span className="font-mono">{it.uid}</span></div>
            <div className="text-sm text-gray-300">Trámite: <span className="font-mono">{it.caseId}</span></div>
            <div className="text-xs text-gray-400">Archivo: {it.fileName || '—'}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={()=>setStatus(it.id, 'validated')} className="bg-green-600 text-white px-3 py-1 rounded">Validar</button>
              <button onClick={()=>setStatus(it.id, 'rejected')} className="bg-red-600 text-white px-3 py-1 rounded">Rechazar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


