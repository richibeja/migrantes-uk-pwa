'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import BackNav from '@/components/BackNav';

type Payment = { id: string; caseId: string; status: string; fileName?: string; storagePath?: string; createdAt?: any };
type CaseRef = { id: string; title?: string };

export default function PaymentsPage() {
  const [uid, setUid] = useState<string | null>(null);
  const [cases, setCases] = useState<CaseRef[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [caseId, setCaseId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUid(u?.uid || null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;
    // cargar casos del usuario
    (async () => {
      const qs = await getDocs(query(collection(db, 'cases'), where('uid','==', uid)));
      setCases(qs.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    })();
    // suscribir pagos del usuario
    const qPayments = query(collection(db, 'payments'), where('uid','==', uid), orderBy('createdAt','desc'));
    const unsub = onSnapshot(qPayments, (snap) => {
      setPayments(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, [uid]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!uid) { setError('Inicia sesión'); return; }
    if (!caseId) { setError('Selecciona un trámite'); return; }
    if (!file) { setError('Selecciona un archivo (imagen/pdf)'); return; }
    try {
      setUploading(true);
      const safeName = `${Date.now()}-${file.name}`;
      const path = `payments/${uid}/${caseId}/${safeName}`;
      const storageRef = ref(storage, path);
      await new Promise<void>((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, file, { contentType: file.type });
        task.on('state_changed', undefined, reject, () => resolve());
      });
      await addDoc(collection(db, 'payments'), {
        uid,
        caseId,
        fileName: file.name,
        storagePath: path,
        status: 'en_revision',
        createdAt: serverTimestamp(),
      });
      setFile(null);
      alert('Comprobante enviado. Quedó en revisión.');
    } catch (e: any) {
      setError(e?.message || 'Error subiendo comprobante');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-2xl font-bold text-gold mb-4">Pagos</h1>
      <form onSubmit={handleUpload} className="max-w-xl bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3 mb-8">
        {error && <div className="text-sm text-red-400">{error}</div>}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Trámite</label>
          <select value={caseId} onChange={(e)=>setCaseId(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" required>
            <option value="">Selecciona…</option>
            {cases.map(c => (
              <option key={c.id} value={c.id}>{c.title || c.id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Comprobante (foto/pdf)</label>
          <input type="file" accept="image/*,application/pdf" onChange={(e)=>setFile(e.target.files?.[0] || null)} className="w-full text-sm" />
        </div>
        <button disabled={uploading} className="bg-gold text-black font-semibold px-4 py-2 rounded disabled:opacity-60">{uploading?'Enviando…':'Enviar comprobante'}</button>
      </form>

      <h2 className="text-xl font-semibold text-gray-100 mb-2">Mis pagos</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {payments.map(p => (
          <div key={p.id} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-100">Trámite: <span className="font-mono">{p.caseId}</span></div>
                <div className="text-xs text-gray-400">Archivo: {p.fileName || '—'}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${p.status==='validated'?'bg-green-700/50 border border-green-500/50':p.status==='rejected'?'bg-red-700/50 border border-red-500/50':'bg-yellow-700/40 border border-yellow-500/40'}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


