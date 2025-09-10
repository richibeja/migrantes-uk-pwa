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

export default function MisTicketsPage({ params }: { params: { id: string } }) {
  return <MisTicketsClient clubId={params.id} />;
}
