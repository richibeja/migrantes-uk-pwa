"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RifaService, RifaTicket, RifaCompartida } from "@/lib/rifaService";

interface RifaData {
  userId: string;
  totalCompartidas: number;
  totalTickets: number;
  historialCompartidas: RifaCompartida[];
}

export default function RifaPage() {
  const [rifaData, setRifaData] = useState<RifaData>({
    userId: "",
    totalCompartidas: 0,
    totalTickets: 0,
    historialCompartidas: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const { user } = useAuth();
  const router = useRouter();
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);

  // Verificar autenticación local
  useEffect(() => {
    const checkLocalAuth = () => {
      try {
        const storedUser = localStorage.getItem('ganaFacilUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData && userData.code) {
            setIsLocalAuthenticated(true);
            loadRifaData();
            return;
          }
        }
        // Si no hay usuario válido, redirigir a activate
        router.push('/activate');
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        router.push('/activate');
      }
    };

    checkLocalAuth();
  }, [router]);

  // Cargar datos de la rifa
  const loadRifaData = async () => {
    try {
      // Obtener usuario del localStorage
      const storedUser = localStorage.getItem('ganaFacilUser');
      const userData = storedUser ? JSON.parse(storedUser) : null;
      const userId = userData?.code || "USER123";
      
      // FIREBASE ACTIVADO - Usar datos reales
      try {
        // Crear o actualizar usuario en la rifa
        await RifaService.createOrUpdateUser(userId);
        
        // Obtener datos reales desde Firebase
        const [rifaData, historial] = await Promise.all([
          RifaService.getUserRifaData(userId),
          RifaService.getHistorialCompartidas(userId)
        ]);
        
        if (rifaData) {
          setRifaData({
            userId: rifaData.userId,
            totalCompartidas: rifaData.totalCompartidas,
            totalTickets: rifaData.totalTickets,
            historialCompartidas: historial
          });
        } else {
          // Si no hay datos, crear usuario nuevo
          const newRifaData: RifaData = {
            userId: userId,
            totalCompartidas: 0,
            totalTickets: 0,
            historialCompartidas: []
          };
          setRifaData(newRifaData);
        }
      } catch (firebaseError) {
        console.error('Error de Firebase:', firebaseError);
        // Fallback a datos simulados si Firebase falla
        const fallbackData: RifaData = {
          userId: userId,
          totalCompartidas: 0,
          totalTickets: 0,
          historialCompartidas: []
        };
        setRifaData(fallbackData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error cargando datos de la rifa:', error);
      setIsLoading(false);
    }
  };

  // Calcular progreso hacia el siguiente ticket
  const calcularProgreso = () => {
    const compartidasRestantes = 5 - (rifaData.totalCompartidas % 5);
    const progreso = ((rifaData.totalCompartidas % 5) / 5) * 100;
    return { compartidasRestantes, progreso };
  };

  // Generar link de invitación único
  const generarLinkInvitacion = () => {
    const storedUser = localStorage.getItem('ganaFacilUser');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const userId = userData?.code || 'USER123';
    
    const linkUnico = RifaService.generarLinkInvitacion(userId);
    setShareLink(linkUnico);
    setShowShareModal(true);
  };

          // Compartir en redes sociales
    const compartirEnRedSocial = async (plataforma: string) => {
      try {
        const storedUser = localStorage.getItem('ganaFacilUser');
        const userData = storedUser ? JSON.parse(storedUser) : null;
        const userId = userData?.code || 'USER123';
        
        // FIREBASE ACTIVADO - Registrar compartida real
        try {
          // Registrar la compartida en Firebase
          const compartidaRegistrada = await RifaService.registrarCompartida(
            userId, 
            shareLink, 
            plataforma
          );
          
          if (compartidaRegistrada) {
            // Recargar datos para mostrar el progreso actualizado
            await loadRifaData();
            
            // Mostrar mensaje de éxito
            alert(`✅ Compartida registrada exitosamente en ${plataforma}`);
          } else {
            alert(`❌ Error al registrar la compartida en ${plataforma}`);
          }
        } catch (firebaseError) {
          console.error('Error de Firebase al registrar compartida:', firebaseError);
          alert(`❌ Error de conexión. Intenta de nuevo.`);
        }
        
        const texto = `🏆 ¡GRAN RIFA EXCLUSIVA! 🏆\n\n🚗 Chevrolet Silverado 2025 4x4\n⚪ Color Blanco - 0 Millas\n🏢 Totalmente Nueva de Concesionario\n\n🎯 Participa GRATIS compartiendo la app\n📱 GanaFácil - La mejor app de predicciones\n\n${shareLink}`;
      
       switch (plataforma) {
         case 'whatsapp':
           window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
           break;
         case 'facebook':
           window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`);
           break;
         case 'twitter':
           window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(shareLink)}`);
           break;
         case 'telegram':
           window.open(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(texto)}`);
           break;
         case 'copy':
           try {
             await navigator.clipboard.writeText(shareLink);
             alert('¡Link copiado al portapapeles!');
           } catch (clipboardError) {
             // Fallback para navegadores que no soportan clipboard API
             const textArea = document.createElement('textarea');
             textArea.value = shareLink;
             document.body.appendChild(textArea);
             textArea.select();
             document.execCommand('copy');
             document.body.removeChild(textArea);
             alert('¡Link copiado al portapapeles!');
           }
           break;
       }
      } catch (error) {
        console.error('Error compartiendo:', error);
        alert('❌ Error al registrar la compartida. Intenta de nuevo.');
      }
    };

  if (isLoading || !isLocalAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">
            {isLoading ? 'Cargando tu rifa...' : 'Verificando autenticación...'}
          </p>
        </div>
      </div>
    );
  }

  const { compartidasRestantes, progreso } = calcularProgreso();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gold hover:text-yellow-400 transition-colors"
              >
                ← Volver al Dashboard
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gold">🚗 Mi Rifa</h1>
            </div>
            <div className="text-sm text-gray-400">
              Usuario: {(() => {
                try {
                  const storedUser = localStorage.getItem('ganaFacilUser');
                  const userData = storedUser ? JSON.parse(storedUser) : null;
                  return userData?.code?.slice(-4) || 'USER';
                } catch {
                  return 'USER';
                }
              })()}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
                 {/* Hero Section - Chevrolet Silverado */}
         <div className="text-center mb-12">
           <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 mb-8">
               {/* Imagen del Chevrolet Silverado */}
               <div className="mb-6">
                 <img 
                   src="/images/chevrolet-silverado-2025.jpg" 
                   alt="Chevrolet Silverado 2025 4x4 - Color Blanco" 
                   className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border-4 border-white/20"
                   style={{
                     background: 'linear-gradient(45deg, #1e3a8a, #3b82f6, #1e40af)',
                     padding: '20px'
                   }}
                 />
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                 ¡GRAN RIFA EXCLUSIVA!
               </h2>
             <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">
               Chevrolet Silverado 2025 4x4
             </h3>
             <div className="bg-white/20 rounded-2xl p-6 mb-4 inline-block">
               <div className="text-2xl text-white font-bold mb-2">🏆 PREMIO ESPECIAL</div>
               <div className="text-lg text-white space-y-1">
                 <div>🚗 Chevrolet Silverado 2025 4x4</div>
                 <div>⚪ Color: Blanco</div>
                 <div>🆕 0 Millas - Totalmente Nueva</div>
                 <div>🏢 De Concesionario Oficial</div>
               </div>
             </div>
             <p className="text-xl text-blue-100 mb-4">
               Sorteo: <span className="font-bold text-yellow-300">15 de Enero 2026</span>
             </p>
             <div className="bg-gold/20 rounded-2xl p-4 inline-block border-2 border-gold/40">
               <p className="text-lg text-gold font-bold">
                 🎯 <span className="text-white">1 TICKET = 5 COMPARTIDAS</span>
               </p>
             </div>
             
             {/* RESUMEN RÁPIDO */}
             <div className="mt-4 bg-green-600/20 border border-green-600/30 rounded-xl p-4 inline-block">
               <div className="text-center text-green-300">
                 <p className="font-bold text-lg mb-2">🚀 ¡PARTICIPA AHORA!</p>
                 <p className="text-sm">
                   <strong>1.</strong> Comparte la app <strong>2.</strong> Gana tickets <strong>3.</strong> ¡Gana la camioneta!
                 </p>
               </div>
             </div>
             
             {/* INSTRUCCIONES DE PARTICIPACIÓN */}
             <div className="mt-6 bg-white/10 rounded-2xl p-6 border-2 border-blue-500/40">
               <h4 className="text-2xl font-bold text-blue-300 mb-4 text-center">
                 📋 ¿CÓMO PARTICIPAR?
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
                 <div className="space-y-2">
                   <div className="flex items-center space-x-2">
                     <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                     <span>Haz clic en "COMPARTIR APP Y GANAR TICKETS"</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                     <span>Se genera tu link único personalizado</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                     <span>Comparte el link en redes sociales</span>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <div className="flex items-center space-x-2">
                     <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                     <span>Cada persona que use tu link = 1 compartida</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</span>
                     <span>Al llegar a 5 compartidas = 1 ticket</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">6</span>
                     <span>¡Más tickets = más probabilidades de ganar!</span>
                   </div>
                 </div>
               </div>
               <div className="mt-4 text-center">
                 <p className="text-yellow-300 font-bold">
                   🎯 ¡Participa GRATIS! No es necesario comprar nada
                 </p>
                 <p className="text-gray-300 text-xs mt-2">
                   Sorteo automático el 15 de Enero 2026
                 </p>
               </div>
             </div>
           </div>
         </div>

        {/* Estadísticas del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30 text-center">
            <div className="text-4xl mb-2">🎫</div>
            <div className="text-3xl font-bold text-gold mb-2">{rifaData.totalTickets}</div>
            <div className="text-gray-300">Tickets Acumulados</div>
          </div>
          
          <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30 text-center">
            <div className="text-4xl mb-2">📤</div>
            <div className="text-3xl font-bold text-gold mb-2">{rifaData.totalCompartidas}</div>
            <div className="text-gray-300">Total Compartidas</div>
          </div>
          
          <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold text-gold mb-2">{compartidasRestantes}</div>
            <div className="text-gray-300">Faltan para Ticket</div>
          </div>
        </div>

        {/* Progreso hacia el siguiente ticket */}
        <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30 mb-8">
          <h3 className="text-xl font-bold text-gold mb-4 text-center">
            🎯 Progreso hacia tu próximo ticket
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Progreso actual</span>
              <span>{Math.round(progreso)}%</span>
            </div>
            
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-gold to-yellow-500 h-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            
            <div className="text-center text-gray-400">
              <p className="text-lg">
                Has compartido con <span className="text-gold font-bold">{rifaData.totalCompartidas % 5}</span> personas
              </p>
              <p className="text-sm">
                Faltan <span className="text-gold font-bold">{compartidasRestantes}</span> para obtener tu próximo ticket
              </p>
            </div>
          </div>
        </div>

                 {/* Botón de Compartir */}
         <div className="text-center mb-8">
           <button
             onClick={generarLinkInvitacion}
             className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-black px-12 py-6 rounded-2xl font-bold text-2xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/50 border-2 border-yellow-300"
           >
             🚀 COMPARTIR APP Y GANAR TICKETS
           </button>
           <p className="text-gray-400 mt-4 text-lg">
             Cada 5 personas que se registren con tu link, obtienes 1 ticket
           </p>
           <div className="mt-4 bg-blue-600/20 border border-blue-600/30 rounded-xl p-4 inline-block">
             <p className="text-blue-300 text-sm">
               🎯 <strong>¡Participa GRATIS!</strong> No es necesario comprar nada
             </p>
           </div>
         </div>

        {/* Historial de Compartidas */}
        <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gray-600/50 mb-8">
          <h3 className="text-xl font-bold text-gold mb-6 text-center">
            📋 Historial de Compartidas
          </h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {rifaData.historialCompartidas.map((compartida, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {compartida.plataforma === 'whatsapp' ? '📱' : 
                     compartida.plataforma === 'facebook' ? '📘' :
                     compartida.plataforma === 'instagram' ? '📷' :
                     compartida.plataforma === 'telegram' ? '📨' : '🌐'}
                  </span>
                  <div>
                    <div className="text-white font-semibold">
                      Compartida #{index + 1}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {compartida.plataforma.charAt(0).toUpperCase() + compartida.plataforma.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(compartida.fecha).toLocaleDateString('es-ES')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Términos y Condiciones */}
        <div className="text-center">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="text-gray-400 hover:text-gold transition-colors text-lg underline"
          >
            📋 Ver Términos y Condiciones
          </button>
        </div>

        {/* Modal de Compartir */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">
                🚀 Compartir App
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-2">Tu link único:</p>
                  <p className="text-gold text-sm break-all">{shareLink}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => compartirEnRedSocial('whatsapp')}
                  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  📱 WhatsApp
                </button>
                <button
                  onClick={() => compartirEnRedSocial('facebook')}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📘 Facebook
                </button>
                <button
                  onClick={() => compartirEnRedSocial('twitter')}
                  className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  🐦 Twitter
                </button>
                <button
                  onClick={() => compartirEnRedSocial('telegram')}
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  📨 Telegram
                </button>
              </div>
              
              <button
                onClick={() => compartirEnRedSocial('copy')}
                className="w-full bg-gold text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors mb-4"
              >
                  📋 Copiar Link
              </button>
              
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal de Términos y Condiciones */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">
                📋 Términos y Condiciones - Rifa Camioneta 2026
              </h3>
              
                             <div className="space-y-6 text-gray-300">
                 <div>
                   <h4 className="text-lg font-bold text-gold mb-2">🇺🇸 ENGLISH</h4>
                   <div className="space-y-3 text-sm">
                     <p><strong>Eligibility:</strong> Open to all users who share the app 5 times. No purchase necessary.</p>
                     <p><strong>Prize:</strong> One (1) Chevrolet Silverado 2025 4x4, White, 0 miles, brand new from dealership.</p>
                     <p><strong>Entry Method:</strong> Each user receives 1 ticket for every 5 app shares completed.</p>
                     <p><strong>Drawing:</strong> Automatic random selection on January 15, 2026 via Firebase Cloud Function.</p>
                     <p><strong>Notification:</strong> Winner will be notified via push notification and email.</p>
                     <p><strong>Legal:</strong> This is a sweepstakes promotion. Void where prohibited by law.</p>
                     <p><strong>Vehicle Details:</strong> 2025 Chevrolet Silverado 4x4, White exterior, 0 miles, factory warranty included.</p>
                   </div>
                 </div>
                 
                 <div>
                   <h4 className="text-lg font-bold text-gold mb-2">🇪🇸 ESPAÑOL</h4>
                   <div className="space-y-3 text-sm">
                     <p><strong>Elegibilidad:</strong> Abierto a todos los usuarios que compartan la app 5 veces. No es necesario comprar.</p>
                     <p><strong>Premio:</strong> Una (1) Chevrolet Silverado 2025 4x4, Color Blanco, 0 millas, totalmente nueva de concesionario.</p>
                     <p><strong>Método de Participación:</strong> Cada usuario recibe 1 ticket por cada 5 compartidas de la app completadas.</p>
                     <p><strong>Sorteo:</strong> Selección aleatoria automática el 15 de enero de 2026 vía Firebase Cloud Function.</p>
                     <p><strong>Notificación:</strong> El ganador será notificado vía notificación push y email.</p>
                     <p><strong>Legal:</strong> Esta es una promoción de sorteo. Válido donde la ley lo permita.</p>
                     <p><strong>Detalles del Vehículo:</strong> Chevrolet Silverado 2025 4x4, Exterior Blanco, 0 millas, garantía de fábrica incluida.</p>
                   </div>
                 </div>
              </div>
              
              <button
                onClick={() => setShowTerms(false)}
                className="w-full bg-gold text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors mt-6"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
