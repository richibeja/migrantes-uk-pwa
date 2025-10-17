import { Metadata, type Viewport } from 'next';
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/dictionaries';
import './globals.css';
import { I18nProvider } from '@/components/I18nProvider';
import LanguageToggleWrapper from '@/components/LanguageToggleWrapper';
import PWAInstaller from '@/components/PWAInstaller';
import MetaPixel from '@/components/MetaPixel';

export function generateMetadata(): Metadata {
  // Para exportación estática, usamos configuración por defecto
  const d = getDictionary('en'); // Idioma por defecto
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
      locale: 'en_US',
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
  themeColor: '#3498db',
  colorScheme: 'light',
  userScalable: false,
  viewportFit: 'cover',
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3498db" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GanaFácil" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta httpEquiv="Permissions-Policy" content="ch-dpr=*, ch-device-memory=*, ch-downlink=*, ch-ect=*, ch-rtt=*, ch-ua-arch=*, ch-viewport-width=*, ch-width=*, clipboard-write=*, ch-ua-bitness=*, ch-viewport-height=*, ch-save-data=*" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <script src="/unregister-sw.js" async></script>
        <MetaPixel />
        <I18nProvider>
          <a href="#main" className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-gold focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:z-50">Saltar al contenido principal</a>
          <div className="fixed top-0 right-0 z-50 p-3">
            <LanguageToggleWrapper />
          </div>
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <PWAInstaller />
        </I18nProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Service Worker desactivado - usando script de limpieza
              console.log('🔧 PWA disabled - old service workers will be removed');
            `,
          }}
        />
      </body>
    </html>
  );
}