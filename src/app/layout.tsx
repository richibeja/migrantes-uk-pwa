import { Metadata } from 'next';
import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'GanaFácil - Tu oportunidad de ganar grandes premios',
  description: 'Descubre cómo GanaFácil puede ayudarte a aumentar tus posibilidades de ganar en las loterías.',
  keywords: 'lotería, predicciones, ganar, premios, GanaFácil',
  authors: [{ name: 'GanaFácil Team' }],
  creator: 'GanaFácil',
  publisher: 'GanaFácil',
  robots: 'index, follow',
  openGraph: {
    title: 'GanaFácil - Tu oportunidad de ganar grandes premios',
    description: 'Descubre cómo GanaFácil puede ayudarte a aumentar tus posibilidades de ganar en las loterías.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GanaFácil - Tu oportunidad de ganar grandes premios',
    description: 'Descubre cómo GanaFácil puede ayudarte a aumentar tus posibilidades de ganar en las loterías.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#fbbf24',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}