import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/dictionaries';
import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value === 'en') ? 'en' : 'es';
  const d = getDictionary(lang as any);
  return {
    alternates: { canonical: '/admin' },
    robots: { index: false, follow: false },
    title: d['admin.title'],
    description: d['admin.subtitle'],
    openGraph: {
      title: d['admin.title'],
      description: d['admin.subtitle'],
      locale: lang === 'en' ? 'en_GB' : 'es_ES',
      type: 'website',
    },
  };
}

export default function AdminPage() {
  return <AdminClient />;
}
