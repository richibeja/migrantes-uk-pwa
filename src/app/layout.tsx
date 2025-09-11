import { Metadata, type Viewport } from 'next';
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/dictionaries';
import './globals.css';
import { I18nProvider } from '@/components/I18nProvider';
import LanguageToggle from '@/components/LanguageToggle';

export function generateMetadata(): Metadata {
  // Para exportación estática, usamos configuración por defecto
  const d = getDictionary('es'); // Idioma por defecto
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gana-facil-rifa-d5609.web.app'),
    title: d['meta.title'],
    description: d['meta.description'],
    keywords: d['meta.keywords'],
    authors: [{ name: 'Gana Fácil' }],
    creator: 'Gana Fácil',
    publisher: 'Gana Fácil',
    robots: 'index, follow',
    openGraph: {
      title: d['meta.og.title'],
      description: d['meta.og.description'],
      type: 'website',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: d['meta.twitter.title'],
      description: d['meta.twitter.description'],
    },
  };
}

// Configuración para exportación estática
export const dynamic = 'force-static';
export const revalidate = false;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbbf24',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Para exportación estática, usamos idioma por defecto
  const htmlLang = 'es';
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
        </I18nProvider>
      </body>
    </html>
  );
}