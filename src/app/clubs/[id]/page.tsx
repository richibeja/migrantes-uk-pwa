// Para exportación estática
export const dynamic = 'force-static';
export const revalidate = false;

// Generar parámetros estáticos para exportación
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

import ClubDashboardClient from './ClubDashboardClient';

interface Club {
  id: string;
  nombre: string;
  descripcion: string;
  miembros: number;
  saldoColectivo: number;
  jugadasExitosas: number;
  fechaCreacion: string;
  estado: 'activo' | 'inactivo';
  administrador: string;
  configuracion: {
    aporteMinimo: number;
    aporteMaximo: number;
    autoaprobacion: boolean;
  };
}

interface Miembro {
  id: string;
  nombre: string;
  email: string;
  rol: 'administrador' | 'miembro';
  saldoPersonal: number;
  aportesTotales: number;
  premiosRecibidos: number;
  fechaIngreso: string;
}

interface Jugada {
  id: string;
  numeros: number[];
  loteria: string;
  inversionTotal: number;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'completada';
  fechaCreacion: string;
  creador: string;
  aprobaciones: number;
  rechazos: number;
}

export default async function ClubDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClubDashboardClient clubId={id} />;
}
