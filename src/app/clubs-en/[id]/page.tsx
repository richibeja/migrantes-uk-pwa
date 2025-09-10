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

export default function ClubEnPage({ params }: { params: { id: string } }) {
  return <ClubDashboardClient clubId={params.id} />;
}
