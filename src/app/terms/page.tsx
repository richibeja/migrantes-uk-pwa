export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gold mb-8">Términos de Servicio</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">1. Aceptación de los Términos</h2>
            <p>Al acceder y usar GanaFácil, aceptas estar sujeto a estos Términos de Servicio y a todas las leyes y regulaciones aplicables.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">2. Descripción del Servicio</h2>
            <p>GanaFácil proporciona predicciones de lotería basadas en inteligencia artificial. Estas predicciones son únicamente para fines informativos y de entretenimiento.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">3. Uso Responsable</h2>
            <p>Los usuarios deben usar el servicio de manera responsable. No garantizamos ganancias y no somos responsables de pérdidas financieras.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">4. Limitación de Responsabilidad</h2>
            <p>En ningún caso GanaFácil será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso de nuestro servicio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">5. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">6. Contacto</h2>
            <p>Para preguntas sobre estos Términos de Servicio, contacta: soporte@ganafacil.com</p>
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
