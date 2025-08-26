"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useI18n } from "@/components/I18nProvider";
import BackNav from '@/components/BackNav';

type LinkItem = {
  id: string;
  name: string;
  url: string;
  official?: boolean;
  tags?: string[];
  locale?: 'es'|'en';
};

export default function DirectoryPage() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<LinkItem[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Collection: directoryLinks (name, url, official:boolean, tags:string[], locale:'es'|'en')
        const q = query(collection(db, 'directoryLinks'));
        const snap = await getDocs(q);
        const data: LinkItem[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
        setItems(data);
      } catch {
        // Fallback minimal if Firestore empty
        setItems([
          { id: 'gov-identity', name: 'GOV.UK — Identity documents', url: 'https://www.gov.uk/government/collections/identity-documents', official: true, tags: ['gov','identity'], locale: 'en' },
          { id: 'citizens-imm', name: 'Citizens Advice — Immigration', url: 'https://www.citizensadvice.org.uk/immigration/', official: true, tags: ['ngo','advice'], locale: 'en' },
          { id: 'refugee-support', name: 'Refugee Council — Support', url: 'https://www.refugeecouncil.org.uk/', official: true, tags: ['ngo','refugees'], locale: 'en' },
          { id: 'redcross-refugee', name: 'British Red Cross — Refugee support', url: 'https://www.redcross.org.uk/get-help/get-help-as-a-refugee', official: true, tags: ['ngo','refugees'], locale: 'en' },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return items.filter(it => {
      if (onlyOfficial && !it.official) return false;
      if (!q) return true;
      const hay = `${it.name} ${it.url} ${(it.tags||[]).join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, filter, onlyOfficial]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">Directorio</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar (ej. gov.uk, Refugee)"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
        />
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={onlyOfficial} onChange={(e)=>setOnlyOfficial(e.target.checked)} className="accent-gold" />
          Solo oficiales
        </label>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Cargando…</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-gold/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-100 font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-400">{(r.tags||[]).join(', ')}</div>
                </div>
                {r.official && (
                  <span className="text-xs bg-green-700/60 border border-green-500/40 text-white px-2 py-1 rounded">Oficial</span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 text-xs text-gray-500">Funciona offline con resultados en caché del navegador.</div>
    </div>
  );
}



