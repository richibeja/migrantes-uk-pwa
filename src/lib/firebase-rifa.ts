// Configuración de Firebase para el sistema de rifa
export interface RifaTicket {
  userId: string;
  userCode: string;
  totalCompartidas: number;
  totalTickets: number;
  historialCompartidas: Array<{
    fecha: string;
    persona: string;
    plataforma: string;
    referidoId?: string;
  }>;
  createdAt: string;
  lastUpdated: string;
}

export interface RifaCompartida {
  id: string;
  userId: string;
  userCode: string;
  plataforma: string;
  fecha: string;
  referidoId?: string;
  referidoCode?: string;
}

export interface RifaGanador {
  userId: string;
  userCode: string;
  ticketGanador: string;
  fechaSorteo: string;
  premio: string;
  notificado: boolean;
  fechaNotificacion?: string;
}

// Configuración de la rifa
export const RIFA_CONFIG = {
  FECHA_SORTEO: '2026-01-15T20:00:00Z',
  TICKETS_POR_COMPARTIDA: 5, // Cada 5 compartidas = 1 ticket
  PREMIO: 'Chevrolet Silverado 2025 4x4 - Blanco - 0 Millas',
  MAX_TICKETS_POR_USUARIO: 100, // Límite de seguridad
  PLATAFORMAS_VALIDAS: ['WhatsApp', 'Facebook', 'Instagram', 'Twitter', 'Telegram', 'Email', 'SMS']
};

// Funciones para interactuar con Firebase
export class RifaService {
  // Obtener tickets del usuario
  static async getUserTickets(userId: string): Promise<RifaTicket | null> {
    try {
      // Aquí iría la llamada real a Firebase
      // const doc = await firebase.firestore().collection('rifa_tickets').doc(userId).get();
      // return doc.exists ? doc.data() as RifaTicket : null;
      
      // Mock data para desarrollo
      return {
        userId,
        userCode: userId.slice(-4),
        totalCompartidas: 12,
        totalTickets: 2,
        historialCompartidas: [
          { fecha: '2025-01-15', persona: 'María García', plataforma: 'WhatsApp' },
          { fecha: '2025-01-14', persona: 'Carlos López', plataforma: 'Facebook' },
          { fecha: '2025-01-13', persona: 'Ana Martínez', plataforma: 'Instagram' },
          { fecha: '2025-01-12', persona: 'Luis Rodríguez', plataforma: 'WhatsApp' },
          { fecha: '2025-01-11', persona: 'Sofia Torres', plataforma: 'Telegram' },
          { fecha: '2025-01-10', persona: 'Diego Silva', plataforma: 'WhatsApp' },
          { fecha: '2025-01-09', persona: 'Valentina Ruiz', plataforma: 'Facebook' },
          { fecha: '2025-01-08', persona: 'Andrés Vargas', plataforma: 'WhatsApp' },
          { fecha: '2025-01-07', persona: 'Camila Herrera', plataforma: 'Instagram' },
          { fecha: '2025-01-06', persona: 'Sebastián Castro', plataforma: 'WhatsApp' },
          { fecha: '2025-01-05', persona: 'Isabella Morales', plataforma: 'Facebook' },
          { fecha: '2025-01-04', persona: 'Mateo Rojas', plataforma: 'WhatsApp' }
        ],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error obteniendo tickets del usuario:', error);
      return null;
    }
  }

  // Registrar una nueva compartida
  static async registrarCompartida(
    userId: string, 
    userCode: string, 
    plataforma: string,
    referidoId?: string,
    referidoCode?: string
  ): Promise<boolean> {
    try {
      // Aquí iría la lógica real de Firebase
      // 1. Crear documento en colección compartidas
      // 2. Actualizar contador de tickets del usuario
      // 3. Verificar si se debe otorgar un nuevo ticket
      
      console.log('Registrando compartida:', {
        userId,
        userCode,
        plataforma,
        referidoId,
        referidoCode
      });
      
      return true;
    } catch (error) {
      console.error('Error registrando compartida:', error);
      return false;
    }
  }

  // Verificar si se debe otorgar un nuevo ticket
  static calcularNuevoTicket(totalCompartidas: number): boolean {
    return totalCompartidas % RIFA_CONFIG.TICKETS_POR_COMPARTIDA === 0;
  }

  // Obtener estadísticas globales de la rifa
  static async getRifaStats(): Promise<{
    totalUsuarios: number;
    totalTickets: number;
    totalCompartidas: number;
    fechaSorteo: string;
    premio: string;
  }> {
    try {
      // Aquí iría la llamada real a Firebase
      return {
        totalUsuarios: 1250,
        totalTickets: 3120,
        totalCompartidas: 15600,
        fechaSorteo: RIFA_CONFIG.FECHA_SORTEO,
        premio: RIFA_CONFIG.PREMIO
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas de la rifa:', error);
      return {
        totalUsuarios: 0,
        totalTickets: 0,
        totalCompartidas: 0,
        fechaSorteo: RIFA_CONFIG.FECHA_SORTEO,
        premio: RIFA_CONFIG.PREMIO
      };
    }
  }

  // Generar link de invitación único
  static generarLinkInvitacion(userCode: string): string {
    // Usar URL de Vercel para compartir la app
    const baseUrl = 'https://gana-facil-rifa.vercel.app';
    return `${baseUrl}/?ref=${userCode}&rifa=true`;
  }

  // Validar plataforma de compartida
  static validarPlataforma(plataforma: string): boolean {
    return RIFA_CONFIG.PLATAFORMAS_VALIDAS.includes(plataforma);
  }
}

// Cloud Function para el sorteo automático (se ejecuta el 15 de enero 2026)
export const SORTEO_CLOUD_FUNCTION = `
// Firebase Cloud Function - Sorteo Automático Rifa Camioneta
// Se ejecuta automáticamente el 15 de enero 2026 a las 8:00 PM UTC

exports.sorteoRifaCamioneta = functions.pubsub.schedule('0 20 15 1 *').onRun(async (context) => {
  try {
    const db = admin.firestore();
    
    // Obtener todos los tickets válidos
    const ticketsSnapshot = await db.collection('rifa_tickets').get();
    const todosLosTickets = [];
    
    ticketsSnapshot.forEach(doc => {
      const ticket = doc.data();
      for (let i = 0; i < ticket.totalTickets; i++) {
        todosLosTickets.push({
          userId: ticket.userId,
          userCode: ticket.userCode,
          ticketId: \`\${doc.id}_\${i}\`
        });
      }
    });
    
    // Selección aleatoria justa
    const indiceGanador = Math.floor(Math.random() * todosLosTickets.length);
    const ganador = todosLosTickets[indiceGanador];
    
    // Guardar ganador
    await db.collection('rifa_ganadores').add({
      userId: ganador.userId,
      userCode: ganador.userCode,
      ticketGanador: ganador.ticketId,
      fechaSorteo: new Date().toISOString(),
      premio: 'Chevrolet Silverado 2025 4x4 - Blanco - 0 Millas',
      notificado: false
    });
    
    // Enviar notificación push al ganador
    await enviarNotificacionGanador(ganador.userId);
    
    console.log('Sorteo completado. Ganador:', ganador);
    return null;
    
  } catch (error) {
    console.error('Error en el sorteo:', error);
    throw error;
  }
});

async function enviarNotificacionGanador(userId) {
  // Lógica para enviar notificación push y email
  // Usar Firebase Cloud Messaging y SendGrid
}
`;

// Configuración de Firebase Dynamic Links para la rifa
export const DYNAMIC_LINKS_CONFIG = {
  DOMAIN: 'ganafacil.page.link',
  ANDROID_PACKAGE: 'com.ganafacil.app',
  IOS_BUNDLE_ID: 'com.ganafacil.app',
  FALLBACK_URL: 'https://ganafacil.com/rifa',
  SOCIAL_TITLE: '¡Participa en la GRAN RIFA de una Chevrolet Silverado 2025!',
  SOCIAL_DESCRIPTION: 'Gana una camioneta totalmente nueva compartiendo la app GanaFácil',
  SOCIAL_IMAGE_URL: 'https://ganafacil.com/images/chevy-silverado-rifa.jpg'
};
