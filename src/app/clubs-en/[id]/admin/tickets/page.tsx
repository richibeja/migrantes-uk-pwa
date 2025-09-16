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

import AdminTicketsClient from './AdminTicketsClient';

export default async function AdminTicketsEnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminTicketsClient clubId={id} />;
}
