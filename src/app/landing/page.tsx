import Image from "next/image";

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-yellow-400" aria-hidden {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconCloudOff(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-sky-300" aria-hidden {...props}>
      <path d="M10 5a7 7 0 0 1 6.71 5.02A4.5 4.5 0 1 1 16 20H7a5 5 0 0 1-1.92-9.6" />
      <path d="m3 3 18 18" />
    </svg>
  );
}

function IconBell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-emerald-300" aria-hidden {...props}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    </svg>
  );
}

export default function LandingPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://migrantes-uk-pwa.vercel.app';
  const shareUrl = `${siteUrl}/landing`;
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-sky-800 text-white">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Migrantes UK — Tu compañero en trámites legales</h1>
              <p className="max-w-prose text-lg text-slate-200">Te ayuda a lograr tu asilo y regularizar tu situación: guía clara, recordatorios y documentos seguros.</p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="/auth/register" className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black shadow-gold transition hover:translate-y-[-2px] hover:bg-yellow-300">Regístrate gratis</a>
                <a href="https://wa.me/18053080769?text=Hola,%20quiero%20orientaci%C3%B3n%20sobre%20mis%20tr%C3%A1mites" target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/30">Asesoría por WhatsApp</a>
              </div>
              <p className="text-sm text-slate-300">Asesoría con expertos que te ayudarán en cada paso.</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-[460px] w-[240px] rounded-[2.5rem] border-4 border-slate-300 bg-gradient-to-b from-slate-700 to-slate-900 p-3 shadow-2xl">
                <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/10">
                  <Image src="/images/hero-phone.png" alt="Vista de la app en móvil" width={240} height={460} className="h-full w-full object-cover" priority />
                </div>
                <div className="absolute left-1/2 top-1 -translate-x-1/2 rounded-b-xl bg-slate-300 px-8 py-1" />
                <div className="absolute bottom-2 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h3 className="mb-6 text-center text-xl font-semibold">Respaldado por organismos del Reino Unido</h3>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a href="https://www.gov.uk/government/organisations/home-office" target="_blank" rel="noopener noreferrer" aria-label="Home Office"><Image src="/images/logos/home-office.svg" alt="Home Office" width={120} height={48} className="h-8 md:h-12 w-auto" /></a>
            <a href="https://www.gov.uk/government/organisations/uk-visas-and-immigration" target="_blank" rel="noopener noreferrer" aria-label="UK Visas & Immigration"><Image src="/images/logos/ukvi.svg" alt="UK Visas & Immigration" width={120} height={48} className="h-8 md:h-12 w-auto" /></a>
            <a href="https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service" target="_blank" rel="noopener noreferrer" aria-label="HM Courts & Tribunals Service"><Image src="/images/logos/hm-courts-tribunals.svg" alt="HM Courts & Tribunals Service" width={120} height={48} className="h-8 md:h-12 w-auto" /></a>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-center text-3xl font-bold">Beneficios clave</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/10"><IconShield /><h3 className="mt-4 text-xl font-semibold">Orientación clara</h3><p className="mt-2 text-slate-300">Pasos simples y checklist por trámite, sin tecnicismos.</p></div>
            <div className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/10"><IconCloudOff /><h3 className="mt-4 text-xl font-semibold">Sin olvidos</h3><p className="mt-2 text-slate-300">Notificaciones antes de vencimientos y citas importantes.</p></div>
            <div className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/10"><IconBell /><h3 className="mt-4 text-xl font-semibold">Documentos seguros</h3><p className="mt-2 text-slate-300">Guarda, organiza y descarga cartas y comprobantes.</p></div>
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold">Cómo te ayuda</h2>
              <ul className="mt-4 space-y-3 text-slate-200">
                <li>• Plan paso a paso para asilo y otros trámites.</li>
                <li>• Qué evidencias juntar y cómo ordenarlas.</li>
                <li>• Recordatorios de plazos, citas y entregas.</li>
                <li>• Preparación de entrevistas y audiencias.</li>
                <li>• Documentos en un solo lugar, listos para descargar.</li>
                <li>• Acceso sin internet a tus recursos.</li>
              </ul>
              <div className="mt-6"><a href="/help-documents" className="inline-flex items-center rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300">Ver cómo funciona</a></div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <Image src="/images/explain.png" alt="Cómo funciona Migrantes UK" width={800} height={500} className="h-64 w-full max-w-md rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Qué obtienes al registrarte</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/10"><h3 className="text-xl font-semibold">Hoy mismo</h3><ul className="mt-3 space-y-2 text-slate-300"><li>• Checklist inicial para tu caso.</li><li>• Recordatorios activados de fechas clave.</li><li>• Plantillas básicas (cartas y listas de evidencias).</li></ul></div>
            <div className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/10"><h3 className="text-xl font-semibold">Siempre</h3><ul className="mt-3 space-y-2 text-slate-300"><li>• Espacio seguro para tus documentos.</li><li>• Acceso offline a recursos clave.</li><li>• Asesoría por WhatsApp cuando la necesites.</li></ul></div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h3 className="mb-4 text-center text-2xl font-semibold">Comparte Migrantes UK</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`https://wa.me/?text=${encodeURIComponent('Migrantes UK — Guía para asilo y trámites: ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300 ring-1 ring-green-400/30 hover:bg-green-500/30">WhatsApp</a>
            <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Migrantes UK — Guía para asilo y trámites')}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-300 ring-1 ring-sky-400/30 hover:bg-sky-500/30">Telegram</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300 ring-1 ring-blue-400/30 hover:bg-blue-600/30">Facebook</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Guía para asilo y trámites con recordatorios y documentos seguros')}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-500/20 px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-gray-400/30 hover:bg-gray-500/30">X (Twitter)</a>
            <a href={`mailto:?subject=${encodeURIComponent('Migrantes UK')}&body=${encodeURIComponent('Te comparto esta app para trámites: ' + shareUrl)}`} className="rounded-full bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-500/30">Email</a>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-center text-3xl font-bold">Testimonios</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[{ name: 'María G.', text: 'La app me dio claridad en minutos.' }, { name: 'Jon A.', text: 'Pude organizar mis documentos fácilmente.' }, { name: 'Luisa P.', text: 'Las alertas me salvaron de un vencimiento.' }].map((t, i) => (
              <div key={i} className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-blue-600" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-slate-300">{t.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="download">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-3xl bg-gradient-to-r from-yellow-400 to-amber-500 p-10 text-black shadow-gold">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h3 className="text-2xl font-extrabold">Empieza hoy mismo tu camino seguro con Migrantes UK</h3>
                <p className="mt-2 text-black/70">Descarga la app y accede a herramientas clave para tus trámites.</p>
              </div>
              <a href="/auth/register" className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900">Crear cuenta</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3"><div className="h-8 w-8 rounded bg-slate-300" /><span className="text-sm text-slate-300">Migrantes UK</span></div>
            <nav className="flex items-center gap-6 text-sm text-slate-300"><a href="#contacto" className="hover:text-white">Contacto</a><a href="#privacidad" className="hover:text-white">Privacidad</a><a href="#terminos" className="hover:text-white">Términos</a></nav>
            <p className="text-sm text-slate-400">© 2025 Migrantes UK</p>
          </div>
        </div>
      </footer>
    </main>
  );
}


