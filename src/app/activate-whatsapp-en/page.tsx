'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, ShoppingCart } from 'lucide-react';

export default function ActivateWhatsAppEnPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to payment page - no WhatsApp activation
    setTimeout(() => {
      router.push('/payment');
    }, 3000);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
        <ShoppingCart className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">Professional Purchase Process</h1>
        
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6 mb-6">
          <Crown className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
          <p className="text-lg mb-2">
            We now use a <strong>professional payment system</strong>
          </p>
          <p className="text-sm text-blue-200">
            Purchase through Hotmart and get automatic activation via email
          </p>
        </div>

        <div className="space-y-3">
          <a 
            href="/payment" 
            className="block w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-all"
          >
            View Plans & Purchase
          </a>
          
          <a 
            href="/" 
            className="block w-full border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-900 transition-all"
          >
            Back to Home
          </a>
        </div>

        <p className="text-xs text-gray-300 mt-6">
          Redirecting to payment page...
        </p>
      </div>
    </div>
  );
}



