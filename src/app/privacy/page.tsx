export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gold mb-8">Política de Privacidad</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">1. Información que recopilamos</h2>
            <p>Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico y número de teléfono cuando te registras en nuestro servicio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">2. Cómo usamos tu información</h2>
            <p>Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones y comunicarnos contigo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">3. Protección de datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">4. Cookies</h2>
            <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web y analizar el uso del mismo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">5. Contacto</h2>
            <p>Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos en: soporte@ganafacil.com</p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="bg-gold text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
