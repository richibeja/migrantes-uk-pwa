'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLoginPage() {
  const router = useRouter();
  
  // Redirigir a la página en español
  React.useEffect(() => {
    router.push('/auth/login-es');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
        <p className="text-gray-300">Redirigiendo...</p>
      </div>
    </div>
  );
}