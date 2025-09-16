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

import MisTicketsClient from './MisTicketsClient';

export default async function MisTicketsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MisTicketsClient clubId={id} />;
}
