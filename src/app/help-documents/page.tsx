"use client";

import Link from "next/link";
import BackNav from '@/components/BackNav';
import { useI18n } from "@/components/I18nProvider";

type Resource = { name: string; url: string; locale: 'es'|'en'; official?: boolean };

const resources: Resource[] = [
  { name: 'GOV.UK — Proving your identity', url: 'https://www.gov.uk/government/collections/identity-documents', locale: 'en', official: true },
  { name: 'Citizens Advice — Help with documents', url: 'https://www.citizensadvice.org.uk/immigration/', locale: 'en', official: true },
  { name: 'Refugee Council — Support', url: 'https://www.refugeecouncil.org.uk/', locale: 'en', official: true },
  { name: 'British Red Cross — Refugee support', url: 'https://www.redcross.org.uk/get-help/get-help-as-a-refugee', locale: 'en', official: true },
  { name: 'GOV.UK — Obtener pasaporte (información general)', url: 'https://www.gov.uk/browse/abroad/passports', locale: 'es', official: true },
];

export default function HelpDocumentsPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">{t('help.title')}</h1>
      <p className="text-gray-300 mb-6">{t('help.subtitle')}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gold mb-3">{t('help.section.es')}</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Acude a la autoridad competente de tu país (consulado/embajada) para tramitar tu documento.</li>
            <li>• Pide apoyo a organizaciones reconocidas si necesitas orientación.</li>
            <li>• Prepara pruebas de identidad: certificados de nacimiento, documentos escolares/laborales, testigos familiares, etc.</li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gold mb-3">{t('help.section.en')}</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Contact your embassy/consulate or the competent authority to apply for your ID/passport.</li>
            <li>• Ask recognised organisations for guidance and support.</li>
            <li>• Prepare identity evidence: birth certificates, school/work records, family witnesses, etc.</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gold mb-4">{t('help.guides.title')}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((r) => (
          <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-gold/50" aria-label={`Abrir enlace ${r.official ? 'oficial' : ''}: ${r.name}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-100 font-semibold">{r.name}</div>
                <div className="text-xs text-gray-400">{r.locale.toUpperCase()}</div>
              </div>
              {r.official && (
                <span className="text-xs bg-green-700/60 border border-green-500/40 text-white px-2 py-1 rounded" aria-hidden="true">{t('help.badge.official')}</span>
              )}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-400">{t('help.privacy')}</div>

      <div className="mt-8">
        <Link href="/qna" className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400">{t('help.btn.backQna')}</Link>
      </div>
    </div>
  );
}


