export type CaseStatus =
  | 'borrador'
  | 'en_revision'
  | 'pendiente_pago'
  | 'pagado'
  | 'en_proceso'
  | 'entregado';

export interface TimelineStep {
  step: string;      // Nombre del paso (ej: "Revisión inicial")
  date: string;      // ISO date string (Firestore Timestamp.toDate().toISOString())
  note?: string;     // Comentario opcional
}

export interface Attachments {
  cliente: string[]; // URLs de archivos del cliente
  admin: string[];   // URLs de archivos del admin
}

export interface Case {
  id: string;               // Firestore docId
  caseCode: string;         // Código único visible al cliente
  uid: string;              // UID del usuario dueño
  title: string;            // Tipo/título de trámite
  amount: number;           // Valor del trámite
  paymentMethod: 'whatsapp';
  status: CaseStatus;       // Estado actual
  createdAt: string;        // ISO string
  updatedAt: string;        // ISO string
  timeline: TimelineStep[]; // Pasos del proceso
  attachments: Attachments; // Archivos
}




