import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Configuración de la rifa
export const RIFA_CONFIG = {
  FECHA_SORTEO: new Date('2026-01-15T00:00:00Z'),
  TICKETS_POR_COMPARTIDA: 5,
  PREMIO: 'Chevrolet Silverado 2025 4x4 - Color Blanco',
  MAX_TICKETS_POR_USUARIO: 100,
  PLATAFORMAS_VALIDAS: ['whatsapp', 'facebook', 'twitter', 'telegram', 'instagram', 'copy']
};

// Interfaces
export interface RifaTicket {
  id: string;
  userId: string;
  fechaCreacion: Date;
  fechaSorteo: Date;
  esGanador: boolean;
  numeroTicket: number;
}

export interface RifaCompartida {
  id: string;
  userId: string;
  linkReferido: string;
  plataforma: string;
  fecha: Date;
  ipAddress: string;
  userAgent: string;
}

export interface RifaGanador {
  id: string;
  userId: string;
  ticketId: string;
  fechaGanador: Date;
  premio: string;
  notificado: boolean;
}

// Servicio principal de la rifa
export class RifaService {
  
  // Obtener datos de rifa del usuario
  static async getUserRifaData(userId: string) {
    try {
      const userDoc = await getDoc(doc(db, 'rifa_tickets', userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          userId: data.userId,
          totalCompartidas: data.totalCompartidas || 0,
          totalTickets: data.totalTickets || 0
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error obteniendo datos de rifa:', error);
      return null;
    }
  }

  // Crear o actualizar usuario en la rifa
  static async createOrUpdateUser(userId: string) {
    try {
      const userRef = doc(db, 'rifa_tickets', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Crear nuevo usuario
        await setDoc(userRef, {
          userId: userId,
          totalCompartidas: 0,
          totalTickets: 0,
          fechaCreacion: serverTimestamp(),
          ultimaActualizacion: serverTimestamp()
        });
      } else {
        // Actualizar timestamp
        await updateDoc(userRef, {
          ultimaActualizacion: serverTimestamp()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error creando/actualizando usuario:', error);
      return false;
    }
  }

  // Registrar una nueva compartida
  static async registrarCompartida(userId: string, linkReferido: string, plataforma: string) {
    try {
      // Validar plataforma
      if (!RIFA_CONFIG.PLATAFORMAS_VALIDAS.includes(plataforma)) {
        throw new Error('Plataforma no válida');
      }

      // Obtener IP y User Agent (simulado por ahora)
      const ipAddress = await this.getClientIP();
      const userAgent = navigator.userAgent;

      // Crear registro de compartida
      const compartidaRef = await addDoc(collection(db, 'rifa_compartidas'), {
        userId: userId,
        linkReferido: linkReferido,
        plataforma: plataforma,
        fecha: serverTimestamp(),
        ipAddress: ipAddress,
        userAgent: userAgent
      });

      // Actualizar contador del usuario
      const userRef = doc(db, 'rifa_tickets', userId);
      await updateDoc(userRef, {
        totalCompartidas: increment(1),
        ultimaActualizacion: serverTimestamp()
      });

      // Verificar si se debe crear un nuevo ticket
      await this.verificarNuevoTicket(userId);

      return compartidaRef.id;
    } catch (error) {
      console.error('Error registrando compartida:', error);
      return null;
    }
  }

  // Verificar si se debe crear un nuevo ticket
  static async verificarNuevoTicket(userId: string) {
    try {
      const userDoc = await getDoc(doc(db, 'rifa_tickets', userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        const totalCompartidas = data.totalCompartidas || 0;
        const totalTickets = data.totalTickets || 0;
        
        // Calcular cuántos tickets debería tener
        const ticketsEsperados = Math.floor(totalCompartidas / RIFA_CONFIG.TICKETS_POR_COMPARTIDA);
        
        if (ticketsEsperados > totalTickets) {
          // Crear nuevo ticket
          const nuevoTicket = await addDoc(collection(db, 'rifa_tickets_detalle'), {
            userId: userId,
            fechaCreacion: serverTimestamp(),
            fechaSorteo: RIFA_CONFIG.FECHA_SORTEO,
            esGanador: false,
            numeroTicket: totalTickets + 1
          });

          // Actualizar contador de tickets
          await updateDoc(doc(db, 'rifa_tickets', userId), {
            totalTickets: increment(1),
            ultimaActualizacion: serverTimestamp()
          });

          // Enviar notificación
          await this.enviarNotificacionTicket(userId, totalTickets + 1);
          
          return nuevoTicket.id;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error verificando nuevo ticket:', error);
      return null;
    }
  }

  // Obtener historial de compartidas
  static async getHistorialCompartidas(userId: string): Promise<RifaCompartida[]> {
    try {
      const q = query(
        collection(db, 'rifa_compartidas'),
        where('userId', '==', userId),
        orderBy('fecha', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const compartidas: RifaCompartida[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        compartidas.push({
          id: doc.id,
          userId: data.userId,
          linkReferido: data.linkReferido,
          plataforma: data.plataforma,
          fecha: data.fecha?.toDate() || new Date(),
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        });
      });
      
      return compartidas;
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      return [];
    }
  }

  // Generar link de invitación único
  static generarLinkInvitacion(userId: string): string {
    // Usar URL de Vercel para compartir la app
    const baseUrl = 'https://gana-facil-rifa.vercel.app';
    return `${baseUrl}/?ref=${userId}&rifa=true`;
  }

  // Validar plataforma
  static validarPlataforma(plataforma: string): boolean {
    return RIFA_CONFIG.PLATAFORMAS_VALIDAS.includes(plataforma);
  }

  // Obtener estadísticas de la rifa
  static async getRifaStats() {
    try {
      const ticketsSnapshot = await getDocs(collection(db, 'rifa_tickets'));
      const compartidasSnapshot = await getDocs(collection(db, 'rifa_compartidas'));
      
      let totalUsuarios = 0;
      let totalCompartidas = 0;
      let totalTickets = 0;
      
      ticketsSnapshot.forEach((doc) => {
        const data = doc.data();
        totalUsuarios++;
        totalCompartidas += data.totalCompartidas || 0;
        totalTickets += data.totalTickets || 0;
      });
      
      return {
        totalUsuarios,
        totalCompartidas,
        totalTickets,
        fechaSorteo: RIFA_CONFIG.FECHA_SORTEO
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return null;
    }
  }

  // Enviar notificación de nuevo ticket
  static async enviarNotificacionTicket(userId: string, numeroTicket: number) {
    try {
      // Aquí se implementaría la lógica de notificaciones push
      console.log(`🎫 Usuario ${userId} obtuvo ticket #${numeroTicket}`);
      return true;
    } catch (error) {
      console.error('Error enviando notificación:', error);
      return false;
    }
  }

  // Obtener IP del cliente (simulado)
  static async getClientIP(): Promise<string> {
    try {
      // En producción, esto se obtendría de un servicio real
      return '192.168.1.1';
    } catch (error) {
      return '0.0.0.0';
    }
  }

  // Verificar si el usuario puede participar
  static async puedeParticipar(userId: string): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, 'rifa_tickets', userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        const totalTickets = data.totalTickets || 0;
        
        return totalTickets < RIFA_CONFIG.MAX_TICKETS_POR_USUARIO;
      }
      
      return true; // Usuario nuevo puede participar
    } catch (error) {
      console.error('Error verificando participación:', error);
      return false;
    }
  }
}
