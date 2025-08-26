"use client";

import { useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import Link from "next/link";
import BackNav from '@/components/BackNav';
import Tesseract from 'tesseract.js';
import { parseMrz } from '@/lib/mrz';
import { loadQnaDraft, saveQnaDraft } from '@/lib/db';

export default function UploadPage() {
  const { t } = useI18n();
  const [noPassport, setNoPassport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setStatus('');
    try {
      const image = await file.arrayBuffer();
      const blob = new Blob([image]);
      const url = URL.createObjectURL(blob);
      const { data } = await Tesseract.recognize(url, 'eng', { logger: () => {} });
      URL.revokeObjectURL(url);
      const text = (data?.text || '').toUpperCase();
      // Try to find MRZ blocks (two lines of ~44 chars)
      const lines = text.split(/\r?\n/).map(l => l.replace(/\s+/g, ''));
      const candidates: string[][] = [];
      for (let i = 0; i < lines.length - 1; i++) {
        const a = lines[i];
        const b = lines[i + 1];
        if (a.length >= 30 && b.length >= 30 && (a.startsWith('P<') || a.includes('<<'))) {
          candidates.push([a, b]);
        }
      }
      let mrz = null;
      for (const pair of candidates) {
        const parsed = parseMrz(pair);
        if (parsed) { mrz = parsed; break; }
      }
      if (!mrz) {
        setStatus('No se detectó MRZ. Reintenta con una foto más clara.');
        return;
      }
      // Merge into existing draft
      const draft = (await loadQnaDraft()) || {};
      const updated = {
        ...draft,
        fullName: draft.fullName || mrz.fullName || '',
        nationality: draft.nationality || mrz.nationality || '',
        dateOfBirth: draft.dateOfBirth || mrz.dateOfBirth || '',
        documentType: 'passport',
        documentNumber: draft.documentNumber || mrz.documentNumber || '',
      };
      await saveQnaDraft(updated);
      localStorage.setItem('asylumFormDraft', JSON.stringify(updated));
      setStatus('Datos de pasaporte detectados y guardados en el borrador de Q&A.');
    } catch (err) {
      console.error(err);
      setStatus('Error procesando la imagen.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-6">{t('upload.title')}</h1>

      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 space-y-4 mb-8">
        <label htmlFor="noPassport" className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5 accent-gold"
            checked={noPassport}
            onChange={(e) => setNoPassport(e.target.checked)}
            id="noPassport"
          />
          <span>{t('upload.checkbox.noPassport')}</span>
        </label>
        {noPassport ? (
          <div className="text-sm text-gray-300">
            {t('upload.text.noPassport')}
            <div className="mt-4">
              <Link href="/qna" className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400">
                {t('upload.btn.goQna')}
              </Link>
              <Link href="/help-documents" className="ml-3 border border-gold text-gold px-4 py-2 rounded-lg font-semibold hover:bg-gold hover:text-black">
                {t('upload.btn.howToDocs')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-300">
            {t('upload.text.withPassport')}
            <div className="mt-4 flex gap-3">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button onClick={() => fileInputRef.current?.click()} className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 text-gray-200">
                {busy ? 'Procesando…' : t('upload.btn.selectFile')}
              </button>
              <Link href="/qna" className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400">
                {t('upload.btn.fillQna')}
              </Link>
              <Link href="/help-documents" className="border border-gold text-gold px-4 py-2 rounded-lg font-semibold hover:bg-gold hover:text-black">
                {t('upload.btn.howToDocs')}
              </Link>
            </div>
            {status && <div className="mt-3 text-xs text-gray-400">{status}</div>}
          </div>
        )}
      </div>

      <div className="text-gray-400 text-sm">{t('upload.privacy')}</div>
    </div>
  );
}


