// Página de bienvenida / Home
'use client';

import { useI18n } from '@/components/I18nProvider';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <section className="max-w-screen-md mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gold tracking-tight">
          {t('app.name') || 'Migrantes UK Web'}
        </h1>
        <p className="mt-3 text-gray-300 text-base md:text-lg">
          Tu asistente para trámites, orientación y directorio de ayuda en el Reino Unido.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/auth/login" className="inline-block bg-gold text-black font-semibold px-5 py-3 rounded-lg hover:bg-yellow-400">
            Entrar / Registrarse
          </Link>
          <Link href="/profile" className="inline-block border border-gold text-gold px-5 py-3 rounded-lg hover:bg-gold hover:text-black">
            Mi perfil
          </Link>
        </div>
      </section>

      <section className="max-w-screen-lg mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <WelcomeCard href="/cases" title="Trámites" desc="Crea y consulta tus trámites. Descarga PDF cuando estén pagados." />
        <WelcomeCard href="/payments" title="Pagos" desc="Sube tu comprobante y desbloquea descargas." />
        <WelcomeCard href="/assistant" title="Asistente" desc="Respuestas básicas laborales y legales (ES/EN)." />
        <WelcomeCard href="/directory" title="Directorio" desc="Organizaciones y recursos oficiales verificados." />
        <WelcomeCard href="/upload" title="Pasaporte / OCR" desc="Escanea MRZ para rellenar datos más rápido." />
        <WelcomeCard href="/qna" title="Formulario" desc="Guarda y continúa tu formulario de asilo." />
      </section>
    </main>
  );
}

function WelcomeCard({ href, title, desc }: { href: string; title: string; desc: string; }) {
  return (
    <Link href={href} className="block group bg-gray-900/60 border border-gray-700 rounded-lg p-4 hover:border-gold transition-colors">
      <h3 className="text-lg font-semibold text-white group-hover:text-gold">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{desc}</p>
      <span className="mt-3 inline-block text-sm text-gold">Abrir →</span>
    </Link>
  );
}