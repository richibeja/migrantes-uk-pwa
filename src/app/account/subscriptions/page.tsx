// Para exportación estática
export const dynamic = 'force-static';
export const revalidate = false;

import SubscriptionManagerClient from './SubscriptionManagerClient';

export default function SubscriptionPage() {
  return <SubscriptionManagerClient />;
}
