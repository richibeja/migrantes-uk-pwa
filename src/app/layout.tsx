import { Metadata, type Viewport } from 'next';
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/dictionaries';
import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import { I18nProvider } from '@/components/I18nProvider';
import LanguageToggle from '@/components/LanguageToggle';
import PushNotifications from '@/components/PushNotifications';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('lang')?.value;
  const lang = (langCookie === 'en' || langCookie === 'es') ? langCookie : 'es';
  const d = getDictionary(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://migrantes-uk-pwa.vercel.app'),
    title: d['meta.title'],
    description: d['meta.description'],
    keywords: d['meta.keywords'],
    authors: [{ name: 'Migrantes UK' }],
    creator: 'Migrantes UK',
    publisher: 'Migrantes UK',
    robots: 'index, follow',
    openGraph: {
      title: d['meta.og.title'],
      description: d['meta.og.description'],
      type: 'website',
      locale: lang === 'en' ? 'en_GB' : 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: d['meta.twitter.title'],
      description: d['meta.twitter.description'],
    },
  };
}

// Forzar render dinámico para evitar HTML cacheado en CDN
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbbf24',
  colorScheme: 'dark',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect cookie language server-side for html lang
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('lang')?.value;
  const htmlLang = cookieLang === 'en' ? 'en' : 'es';
  return (
    <html lang={htmlLang} data-scroll-behavior="smooth">
      <body>
        <I18nProvider>
          <a href="#main" className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-gold focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:z-50">Saltar al contenido principal</a>
          <div className="fixed top-0 right-0 z-50 p-3">
            <LanguageToggle />
          </div>
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <PushNotifications />
        </I18nProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}