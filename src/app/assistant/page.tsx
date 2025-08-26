"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useI18n } from "@/components/I18nProvider";
import { translateText } from "@/lib/translate";
import BackNav from '@/components/BackNav';

type Faq = {
  id: string;
  q_es: string;
  a_es: string;
  q_en?: string;
  a_en?: string;
  tags?: string[];
  link?: string;
  official?: boolean;
};

export default function AssistantPage() {
  const { lang } = useI18n();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Primero Firestore local (faqs)
        const snap = await getDocs(query(collection(db, 'faqs')));
        let data: Faq[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
        // Si no hay datos en Firestore, usar fallback estático local
        if (!data.length) {
          data = [
            { id: 'faq1', q_es: '¿Cómo solicitar asilo en UK?', a_es: 'Consulta gov.uk para pasos oficiales.', link: 'https://www.gov.uk/claim-asylum', official: true, tags: ['asilo','gov'] }
          ];
        }
        // Traducción opcional
        if (lang === 'en') {
          data = await Promise.all(data.map(async f => ({
            ...f,
            q_en: f.q_en || await translateText(f.q_es, 'es', 'en'),
            a_en: f.a_en || await translateText(f.a_es, 'es', 'en'),
          })));
        }
        setFaqs(data);
      } catch {
        setFaqs([
          { id: 'faq1', q_es: '¿Cómo solicitar asilo en UK?', a_es: 'Consulta gov.uk para pasos oficiales.', link: 'https://www.gov.uk/claim-asylum', official: true, tags: ['asilo','gov'] }
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, [lang]);

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter(f => {
      const qText = (lang === 'en' ? (f.q_en || f.q_es) : f.q_es).toLowerCase();
      const aText = (lang === 'en' ? (f.a_en || f.a_es) : f.a_es).toLowerCase();
      const hay = `${qText} ${aText} ${(f.tags||[]).join(' ')}`;
      return hay.includes(q);
    });
  }, [faqs, search, lang]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">Asistente</h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={lang==='en'?'Search FAQ':'Buscar FAQ'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2" />
      </div>
      {loading ? (
        <div className="text-sm text-gray-400">Cargando…</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {list.map(f => (
            <div key={f.id} className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-100">{lang==='en' ? (f.q_en || f.q_es) : f.q_es}</h2>
                {f.official && <span className="text-xs bg-green-700/60 border border-green-500/40 text-white px-2 py-1 rounded">Oficial</span>}
              </div>
              <p className="text-sm text-gray-300 mt-2 whitespace-pre-wrap">{lang==='en' ? (f.a_en || f.a_es) : f.a_es}</p>
              {f.link && (
                <div className="mt-3">
                  <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-gold underline">{f.link}</a>
                </div>
              )}
              {f.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {f.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-2 py-0.5 rounded">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 text-xs text-gray-500">Funciona offline con resultados en caché del navegador.</div>
    </div>
  );
}



