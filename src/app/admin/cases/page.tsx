'use client';

import { useEffect, useMemo, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query, where, updateDoc, doc } from 'firebase/firestore';
import CopyWhatsAppButton from '@/components/CopyWhatsAppButton';
import Link from 'next/link';
import AssignedToDisplay from '@/components/AssignedToDisplay';
import { getSupportCases, getUsers, isFirebaseReady } from '@/lib/firebase-helpers';
import { SupportCase, User } from '@/types/firebase';

// Usar la interface de SupportCase en lugar del tipo local
type CaseItem = SupportCase;

export default function AdminCasesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [items, setItems] = useState<CaseItem[]>([]);
  const [qcode, setQcode] = useState('');
  const [advisors, setAdvisors] = useState<User[]>([]);

  useEffect(() => {
    if (!auth) return;
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      if (!u) { setIsAdmin(false); setUid(null); return; }
      try {
        const token = await u.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
        setUid(u.uid);
      } catch { setIsAdmin(false); }
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!uid || !isFirebaseReady()) return;
    
    const base = collection(db!, 'cases');
    let qref;
    if (qcode.trim()) {
      qref = query(base, where('caseCode', '==', qcode.trim().toUpperCase()));
    } else if (isAdmin) {
      qref = query(base, orderBy('updatedAt', 'desc'));
    } else {
      qref = query(base, where('assignedTo', '==', uid));
    }
    
    const unsub = onSnapshot(qref, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as SupportCase)));
    });
    return () => unsub();
  }, [isAdmin, qcode, uid]);

  useEffect(() => {
    if (!isAdmin || !isFirebaseReady()) return;
    
    const base = collection(db!, 'users');
    const qref = query(base, where('role', '==', 'asesor'));
    const unsub = onSnapshot(qref, (snap) => {
      setAdvisors(snap.docs.map(d => ({ id: d.id, ...d.data() } as User)));
    });
    return () => unsub();
  }, [isAdmin]);

  const advisorByUid = useMemo(() => {
    const map: Record<string, { email: string; name?: string }> = {};
    advisors.forEach(a => { map[a.id] = { email: a.email, name: a.username }; });
    return map;
  }, [advisors]);

  const formatDate = (d: any) => {
    try { return d?.toDate ? d.toDate().toLocaleString() : (d ? new Date(d).toLocaleString() : ''); } catch { return ''; }
  };

  async function reassignCase(id: string, newUid: string) {
    if (!isFirebaseReady()) return;
    await updateDoc(doc(db!, 'cases', id), { assignedTo: newUid });
    alert('Caso reasignado');
  }

  if (!isAdmin) {
    return <div className="min-h-screen bg-black text-white p-6 md:p-10">Acceso restringido</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gold mb-4">Casos (Admin)</h1>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4 flex items-center gap-3">
          <input
            value={qcode}
            onChange={(e)=>setQcode(e.target.value)}
            placeholder="Buscar por CASE_CODE"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {items.map(it => (
            <div key={it.id} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-semibold">{it.title || 'Trámite'}</div>
                  <div className="text-xs text-gray-400">CASE_CODE: <span className="font-mono">{it.caseCode || '—'}</span></div>
                  <AssignedToDisplay assignedTo={it.assignedTo} />
                </div>
                <span className={`text-xs px-2 py-1 rounded ${it.status==='pagado'?'bg-green-700/50 border border-green-500/50':'bg-yellow-700/40 border border-yellow-500/40'}`}>{it.status}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Actualizado: {formatDate(it.updatedAt)}</div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {typeof it.amount === 'number' && it.caseCode && (
                  <CopyWhatsAppButton type="pagoPendiente" caseCode={it.caseCode} monto={it.amount} />
                )}
                {it.caseCode && <CopyWhatsAppButton type="pagoValidado" caseCode={it.caseCode} />}
                {it.caseCode && <CopyWhatsAppButton type="enProceso" caseCode={it.caseCode} />}
                {it.caseCode && <CopyWhatsAppButton type="finalizado" caseCode={it.caseCode} />}
                {it.caseCode && (
                  <Link
                    href={`/track/${it.caseCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Ver seguimiento público ↗
                  </Link>
                )}
                {isAdmin && (
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v) reassignCase(it.id, v);
                    }}
                    className="px-3 py-1 bg-gray-800 text-white rounded-lg border border-gray-700"
                  >
                    <option value="" disabled>Asignar asesor…</option>
                    {advisors.map(a => (
                      <option key={a.uid} value={a.uid}>{a.email || a.uid}</option>
                    ))}
                  </select>
                )}
                {isAdmin && (
                  <button
                    onClick={() => {
                      const newUid = prompt('UID del asesor a asignar:') || '';
                      if (newUid.trim()) reassignCase(it.id, newUid.trim());
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Reasignar caso
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


