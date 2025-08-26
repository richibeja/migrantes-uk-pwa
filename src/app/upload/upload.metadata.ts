import type { Metadata } from 'next';

const d = {
  title: 'Migrantes UK — Subir documento / OCR',
  description: 'Sube documentos o usa OCR/MRZ. Alternativa sin pasaporte disponible.'
};

export const metadata: Metadata = {
  alternates: { canonical: '/upload' },
  title: d.title,
  description: d.description,
  openGraph: { title: d.title, description: d.description, type: 'website' },
};

export default metadata;


