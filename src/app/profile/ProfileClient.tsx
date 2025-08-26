"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { useI18n } from "@/components/I18nProvider";

type FormSummary = {
  id: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  createdAt?: string;
};

export default function ProfileClient() {
  const { t } = useI18n();
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [forms, setForms] = useState<FormSummary[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          const cred = await signInAnonymously(auth);
          setUid(cred.user.uid);
        } else {
          setUid(user.uid);
        }
      } catch {
        setError(t('auth.error.anon'));
      }
    });
    return () => unsub();
  }, []);

  const title = useMemo(() => t('profile.title'), [t]);

  async function loadForms(currentUid: string) {
    setLoading(true);
    setError("");
    try {
      const qy = query(
        collection(db, "users", currentUid, "forms"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(qy);
      const items: FormSummary[] = snap.docs.map((d) => {
        const data: any = d.data();
        const createdAt = data?.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data?.createdAt || undefined;
        return {
          id: d.id,
          fullName: data?.fullName,
          dateOfBirth: data?.dateOfBirth,
          nationality: data?.nationality,
          createdAt,
        };
      });
      setForms(items);
    } catch {
      setError("No se pudieron cargar los formularios.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (uid) {
      loadForms(uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 max-w-screen-sm mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">{title}</h1>
      <p className="text-gray-300 mb-6 text-sm">{t('profile.session')}</p>
      <UserCodeBanner />
      <ProfileControls />
      <ProfileEditor />

      {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-gray-400">{t('profile.uid')}: {uid || "(cargando…)"}</span>
        <button
          onClick={() => uid && loadForms(uid)}
          className="border border-gold text-gold px-4 py-1.5 rounded-md text-sm hover:bg-gold hover:text-black disabled:opacity-60"
          disabled={!uid || loading}
        >
          {loading ? "Actualizando…" : t('profile.btn.refresh')}
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400" role="status" aria-live="polite">{t('profile.loading')}</div>
      ) : forms.length === 0 ? (
        <div className="text-sm text-gray-400" role="status" aria-live="polite">{t('profile.empty')}</div>
      ) : (
        <div className="overflow-x-auto border border-gray-700 rounded-lg">
          <table className="min-w-full text-left text-sm" role="table" aria-label="{t('profile.title')}">
            <thead className="bg-gray-900" role="rowgroup">
              <tr>
                <th scope="col" className="px-4 py-3 border-b border-gray-700">{t('profile.col.id')}</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-700">{t('profile.col.name')}</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-700">{t('profile.col.dob')}</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-700">{t('profile.col.nationality')}</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-700">{t('profile.col.created')}</th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {forms.map((f) => (
                <tr key={f.id} className="odd:bg-gray-950 even:bg-gray-900" role="row">
                  <td className="px-4 py-3 align-top font-mono text-xs text-gray-300">{f.id}</td>
                  <td className="px-4 py-3 align-top">{f.fullName || "—"}</td>
                  <td className="px-4 py-3 align-top">{f.dateOfBirth || "—"}</td>
                  <td className="px-4 py-3 align-top">{f.nationality || "—"}</td>
                  <td className="px-4 py-3 align-top text-xs text-gray-400">{f.createdAt || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-400">{t('profile.tip')}</div>
    </div>
  );
}

function UserCodeBanner() {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = collection(db, 'users');
          const snap = await getDocs(query(docRef, where('__name__','==', user.uid)));
          const d = snap.docs[0]?.data() as any;
          setCode(d?.userCode || null);
        } catch {}
      }
    });
    return () => unsub();
  }, []);
  if (!code) return null;
  return (
    <div className="mb-4 bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm">
      <span className="text-gray-300 mr-2">USER_CODE:</span>
      <code className="font-mono text-gold">{code}</code>
      <button onClick={() => navigator.clipboard.writeText(code)} className="ml-3 text-xs border border-gold text-gold px-2 py-0.5 rounded">Copiar</button>
    </div>
  );
}

function ProfileControls() {
  async function doLogout() {
    try {
      await signOut(auth);
      window.location.href = '/auth/login';
    } catch {}
  }
  return (
    <div className="mb-4 flex items-center gap-3">
      <button onClick={doLogout} className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded">Cerrar sesión</button>
    </div>
  );
}

function ProfileEditor() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [statusMig, setStatusMig] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setOk(''); setError('');
      if (!user) { setUid(null); setLoading(false); return; }
      setUid(user.uid);
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const u: any = snap.data() || {};
        setName(u?.name || '');
        setPhone(u?.phone || '');
        setStatusMig(u?.migratoryStatus || '');
        setCity(u?.city || '');
        setState(u?.state || '');
      } catch {}
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!uid) return;
    setSaving(true); setError(''); setOk('');
    try {
      await setDoc(doc(db, 'users', uid), {
        name,
        phone,
        migratoryStatus: statusMig,
        city,
        state,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      setOk('Perfil actualizado');
    } catch (e: any) {
      setError(e?.message || 'Error al actualizar perfil');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;
  if (!uid) return (
    <div className="mb-6 text-sm text-gray-400">Inicia sesión para editar tu perfil.</div>
  );

  return (
    <form onSubmit={save} className="mb-6 bg-gray-900/50 border border-gray-700 rounded-lg p-4 md:p-5 space-y-4">
      <h2 className="text-lg font-semibold text-gray-100 mb-3">Editar perfil</h2>
      {error && <div className="text-sm text-red-400 mb-2">{error}</div>}
      {ok && <div className="text-sm text-green-400 mb-2">{ok}</div>}
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Nombre</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Teléfono</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Estado migratorio</label>
          <input value={statusMig} onChange={(e)=>setStatusMig(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ciudad</label>
          <input value={city} onChange={(e)=>setCity(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Estado/Condado</label>
          <input value={state} onChange={(e)=>setState(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
      </div>
      <div className="mt-3">
        <button
          disabled={saving}
          className="w-full md:w-auto bg-gold hover:bg-yellow-400 text-black font-bold px-4 py-3 rounded-lg shadow ring-1 ring-amber-300 disabled:opacity-80 disabled:cursor-not-allowed text-base"
        >
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
}


