// Para exportación estática
export const dynamic = 'force-static';
export const revalidate = false;

import DashboardClient from './DashboardClient';

export default function DashboardPageEN() {
  return <DashboardClient />;
}
