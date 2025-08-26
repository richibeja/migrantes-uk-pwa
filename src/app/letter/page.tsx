"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useState } from "react";
import { AsylumFormData } from "@/types/asylum";
import { useI18n } from "@/components/I18nProvider";
import BackNav from '@/components/BackNav';
import { loadQnaDraft } from '@/lib/db';


const LOCAL_KEY = "asylumFormDraft";

export default function LetterPage() {
  const { t } = useI18n();
  const [downloading, setDownloading] = useState(false);
  let form: AsylumFormData = { fullName: '', dateOfBirth: '', nationality: '' } as any;
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_KEY) : null;
    if (raw) form = JSON.parse(raw);
  } catch {}

  async function generatePdf() {
    setDownloading(true);
    try {
      try {
        const dexieDraft = await loadQnaDraft();
        if (dexieDraft) form = { ...form, ...dexieDraft };
      } catch {}
      const pdf = await PDFDocument.create();
      const page = pdf.addPage([595.28, 841.89]); // A4
      const { width, height } = page.getSize();
      const font = await pdf.embedFont(StandardFonts.Helvetica);

      const title = t('letter.pdf.title');
      page.drawText(title, { x: 50, y: height - 80, size: 18, font, color: rgb(1, 0.84, 0) });

      const lines = [
        `${t('letter.pdf.name')}: ${form.fullName || ""}`,
        `${t('letter.pdf.dob')}: ${form.dateOfBirth || ""}`,
        `${t('letter.pdf.nationality')}: ${form.nationality || ""}`,
        `${t('letter.pdf.docType')}: ${form.documentType || "none"}`,
        `${t('letter.pdf.docNumber')}: ${form.documentNumber || ""}`,
        `${t('letter.pdf.phone')}: ${form.phone || ""}`,
        `${t('letter.pdf.email')}: ${form.email || ""}`,
        `${t('letter.pdf.address')}: ${form.address || ""}`,
        ``,
        `${t('letter.pdf.summaryTitle')}`,
        `${form.claimSummary || ""}`,
      ];

      let y = height - 120;
      for (const line of lines) {
        page.drawText(line, { x: 50, y, size: 12, font, color: rgb(0.9, 0.9, 0.9) });
        y -= 20;
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      // Descargar
      const a = document.createElement("a");
      a.href = url;
      a.download = "MigrantesUK-Carta.pdf";
      a.click();
      // Abrir en nueva pestaña también
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">{t('letter.title')}</h1>
      <p className="text-gray-300 text-sm mb-6">{t('letter.tip')}</p>
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-6">
        <p className="text-gray-200 mb-2">{t('letter.preview')}</p>
        <pre className="text-xs whitespace-pre-wrap text-gray-400">{JSON.stringify(form, null, 2)}</pre>
      </div>
      <button onClick={generatePdf} disabled={downloading} aria-label={t('letter.btn.generate')} className="bg-gold text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold/50">
        {downloading ? 'Generando…' : t('letter.btn.generate')}
      </button>
    </div>
  );
}


