'use client';

import { useActivation } from '@/hooks/useActivation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ActivationGuardProps {
  children: React.ReactNode;
}

export default function ActivationGuard({ children }: ActivationGuardProps) {
  const { isActivated, isLoading } = useActivation();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isActivated) {
      router.push('/activate');
    }
  }, [isActivated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">🎯</span>
          </div>
          <p className="text-white text-lg">Verificando activación...</p>
        </div>
      </div>
    );
  }

  if (!isActivated) {
    return null; // Redirigirá a /activate
  }

  return <>{children}</>;
}
