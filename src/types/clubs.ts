// Tipos para el sistema de clubs ANBEL
export interface Club {
  id: string;
  nombre: string;
  descripcion?: string;
  administrador: string; // userID
  miembros: string[]; // array de userIDs
  saldoColectivo: number;
  historialJugadas: Array<{
    id: string;
    fecha: Date;
    numeros: number[];
    inversionTotal: number;
    premioGanado: number;
    estado: 'pendiente' | 'aprobada' | 'rechazada' | 'completada';
    aprobaciones: string[]; // userIDs que aprobaron
    rechazos: string[]; // userIDs que rechazaron
  }>;
  configuracion: {
    aporteMinimo: number;
    aporteMaximo: number;
    autoaprobacion: boolean;
    porcentajeAprobacion: number; // % necesario para aprobar jugadas
  };
  fechaCreacion: Date;
  estado: 'activo' | 'inactivo' | 'suspendido';
  invitaciones: Array<{
    token: string;
    email: string;
    fechaCreacion: Date;
    expira: Date;
    usada: boolean;
  }>;
}

export interface UsuarioClub {
  userId: string;
  clubId: string;
  rol: 'administrador' | 'miembro' | 'invitado';
  fechaIngreso: Date;
  saldoPersonal: number;
  aportesTotales: number;
  premiosRecibidos: number;
  estadisticas: {
    jugadasParticipadas: number;
    aciertos: number;
    porcentajeAciertos: number;
  };
}

export interface JugadaColectiva {
  id: string;
  clubId: string;
  creador: string;
  numeros: number[];
  loteria: string;
  inversionTotal: number;
  aportePorPersona: number;
  fechaCreacion: Date;
  fechaLimiteAprobacion: Date;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'completada';
  aprobaciones: string[];
  rechazos: string[];
  resultado?: {
    numerosGanadores: number[];
    premio: number;
    fechaSorteo: Date;
  };
}

export interface InvitacionClub {
  token: string;
  clubId: string;
  email: string;
  fechaCreacion: Date;
  expira: Date;
  usada: boolean;
  creador: string;
}

export interface ClubTicket {
  id: string;
  userId: string;
  userName: string;
  clubId: string;
  fotoTicket: string; // URL de la imagen en Firebase Storage
  numeros: number[];
  fechaCompra: Date;
  fechaSubida: Date;
  estado: 'pendiente' | 'verificado' | 'rechazado';
  datosVerificacion: {
    fechaSorteo: Date;
    loteria: string; // Ej: "Powerball", "Mega Millions"
    montoPagado: number;
    localCompra: string;
    horaCompra?: string;
  };
  verificacion?: {
    verificadoPor: string;
    fechaVerificacion: Date;
    comentarios?: string;
    motivoRechazo?: string;
  };
}

export interface ClubStats {
  ticketsVerificados: number;
  ticketsPendientes: number;
  inversionTotal: number;
  miembrosActivos: number;
  ticketsEsteMes: number;
  miembroTop: {
    nombre: string;
    tickets: number;
  };
}
