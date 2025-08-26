import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/dictionaries';

export default async function metadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value === 'en') ? 'en' : 'es';
  const d = getDictionary(lang as any);
  return {
    alternates: {
      canonical: '/qna'
    },
    title: d['page.qna.title'],
    description: d['page.qna.description'],
    openGraph: {
      title: d['page.qna.title'],
      description: d['page.qna.description'],
      locale: lang === 'en' ? 'en_GB' : 'es_ES',
      type: 'website',
    },
  };
}


