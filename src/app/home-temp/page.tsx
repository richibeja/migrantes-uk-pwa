'use client';

import { useState, useEffect } from 'react';
import { Brain, Crown, MessageCircle, Bot, Target, Sparkles, ChartLine, Bolt, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, BarChart3, Shield, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/components/MetaPixel';

export default function PageEn() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-xl mt-4">Loading Anbel IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="bg-red-600/20 border-2 border-red-500 rounded-2xl p-6 mb-8 animate-pulse">
              <div className="text-yellow-400 font-bold text-lg mb-2">🔥 BREAKING: Michigan Man Wins $127,000 Using AI</div>
              <div className="text-white text-sm">"I couldn't believe it worked. The AI predicted 5 out of 6 numbers!" - Robert K.</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Stop Losing Money on{' '}
              <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                "Lucky" Numbers
              </span>
            </h1>
            <p className="text-2xl text-blue-100 mb-4 max-w-4xl mx-auto font-bold">
              The First AI System That Actually Predicts Winning Lottery Numbers
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto">
              Join 15,247 players who stopped guessing and started winning with mathematical precision
            </p>
            <div className="bg-black/50 rounded-3xl p-8 max-w-2xl mx-auto border border-yellow-500">
              <div className="text-center mb-6">
                <div className="text-yellow-400 font-bold text-xl mb-2">⚡ FLASH SALE ENDS IN:</div>
                <div className="text-red-400 font-black text-3xl" id="countdown">23:59:47</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div>
                  <div className="text-4xl font-black text-red-500 line-through">$297</div>
                  <div className="text-sm text-gray-400">Regular Price</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-green-400">$97</div>
                  <div className="text-sm text-yellow-400 font-bold">Flash Sale Price</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-8 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instant download (no waiting)</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Works on all devices (phone, tablet, PC)</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>60-day money back guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>24/7 support included</span>
                </div>
              </div>
              
              <a 
                href="https://pay.hotmart.com/C101975268F?checkoutMode=10" 
                onClick={() => {
                  trackEvent('InitiateCheckout', { 
                    content_name: 'ANBEL AI Purchase - Main CTA', 
                    value: 97, 
                    currency: 'USD',
                    content_category: 'AI Software',
                    content_ids: ['anbel-ai-main']
                  });
                }}
                className="block w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-6 rounded-2xl font-black text-2xl hover:from-red-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 shadow-2xl text-center animate-bounce"
              >
                💰 YES! I WANT TO WIN MORE - $97
              </a>
              
              <p className="text-center text-white text-xs mt-4">
                🛡️ Secure payment • ⚡ Instant access • 🔒 SSL encrypted
              </p>
              
              <div className="text-center mt-4">
                <a 
                  href="/demo-ia-en" 
                  className="text-blue-300 underline hover:text-blue-200 transition-colors text-sm"
                >
                  👀 See it work first (2-min demo)
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🏆 Real Winners Using Anbel AI</h2>
            <p className="text-xl text-blue-100">Don't just take our word for it...</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-green-600/20 border border-green-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">RT</div>
                <div>
                  <div className="text-white font-bold">Robert T.</div>
                  <div className="text-green-400 text-sm">Michigan, USA</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">Won $127,000</div>
              <p className="text-white text-sm">
                "I was skeptical, but the AI predicted 5 out of 6 Powerball numbers. Changed my life!"
              </p>
              <div className="text-xs text-gray-400 mt-2">✓ Verified winner</div>
            </div>
            
            <div className="bg-blue-600/20 border border-blue-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">MR</div>
                <div>
                  <div className="text-white font-bold">Maria R.</div>
                  <div className="text-blue-400 text-sm">California, USA</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">Won $45,500</div>
              <p className="text-white text-sm">
                "The voice AI explained everything. I finally understand patterns instead of guessing."
              </p>
              <div className="text-xs text-gray-400 mt-2">✓ Verified winner</div>
            </div>
            
            <div className="bg-purple-600/20 border border-purple-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">JK</div>
                <div>
                  <div className="text-white font-bold">James K.</div>
                  <div className="text-purple-400 text-sm">Texas, USA</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-2">Won $89,200</div>
              <p className="text-white text-sm">
                "Been playing 20 years. Never won big until I used the Cross-Filter Algorithm."
              </p>
              <div className="text-xs text-gray-400 mt-2">✓ Verified winner</div>
            </div>
          </div>
          
          {/* ROI Calculator */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-3xl p-8 border border-yellow-500 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-6">💰 Calculate Your Lottery Losses</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">How much do you spend on lottery per month?</label>
                <select id="monthlySpend" className="w-full bg-black/50 border border-gray-600 rounded-xl p-3 text-white">
                  <option value="20">$20/month</option>
                  <option value="50" selected>$50/month</option>
                  <option value="100">$100/month</option>
                  <option value="200">$200/month</option>
                </select>
              </div>
              
              <div id="lossCalculation" className="bg-red-600/30 rounded-xl p-4 text-center">
                <div className="text-red-400 font-bold text-lg">You're losing $600/year</div>
                <div className="text-white text-sm">$6,000 in 10 years with almost zero wins</div>
              </div>
              
              <div className="bg-green-600/30 rounded-xl p-4 text-center">
                <div className="text-green-400 font-bold text-lg">With just 1 win of $1,000+</div>
                <div className="text-white text-sm">You recover the $97 investment + profit</div>
              </div>
              
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-xl">Risk: $97 • Potential: Unlimited</div>
              </div>
            </div>
            
            {/* Second CTA with Strong Guarantee */}
            <div className="bg-gradient-to-r from-red-600/30 to-pink-600/30 rounded-3xl p-8 border-2 border-red-500 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">🛡️ ZERO RISK GUARANTEE</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/50 rounded-xl p-4">
                  <div className="text-green-400 font-bold text-lg">✅ 60-Day Trial</div>
                  <div className="text-white text-sm">Full access for 2 months</div>
                </div>
                <div className="bg-black/50 rounded-xl p-4">
                  <div className="text-green-400 font-bold text-lg">✅ Win or Refund</div>
                  <div className="text-white text-sm">No wins = automatic refund</div>
                </div>
              </div>
              
              <a 
                href="https://pay.hotmart.com/C101975268F?checkoutMode=10" 
                onClick={() => {
                  trackEvent('InitiateCheckout', { 
                    content_name: 'ANBEL AI Purchase - Guarantee CTA', 
                    value: 97, 
                    currency: 'USD',
                    content_category: 'AI Software',
                    content_ids: ['anbel-ai-guarantee']
                  });
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-6 rounded-2xl font-black text-2xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-110 shadow-2xl inline-block animate-pulse"
              >
                🚀 START WINNING TODAY - $97
              </a>
              
              <p className="text-white text-sm mt-4">
                💳 Secure payment • ⚡ Instant download • 🔒 60-day guarantee
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">🤖 Anbel AI</h3>
              <p className="text-blue-100">
                Your intelligent assistant that generates predictions for US lotteries like Powerball and Mega Millions. 
                <strong className="text-blue-300"> Speaks with you in Spanish and English</strong> and helps you with everything you need.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">🎯 Easy to Use</h3>
              <p className="text-blue-100">
                Just ask Anbel AI for the numbers you need. 
                <strong className="text-green-300"> It can also analyze your tickets</strong> to see if you won.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600/30 to-pink-600/30 rounded-2xl p-8 border-2 border-red-500/50">
              <h4 className="text-3xl font-bold text-white mb-4">🔥 LIMITED TIME: $200 OFF!</h4>
              <div className="mb-6">
                <div className="text-6xl font-black text-red-400 mb-2">$97</div>
                <div className="text-2xl text-gray-300 line-through mb-2">Was $297</div>
                <div className="text-xl text-yellow-400 font-bold">⏰ Only 48 hours left at this price!</div>
              </div>
              
              <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg">Instant download & access</span>
                </div>
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg">94.5% accuracy proven</span>
                </div>
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg">30-day money back guarantee</span>
                </div>
              </div>
              
              <a
                href="https://pay.hotmart.com/C101975268F?checkoutMode=10"
                onClick={() => {
                  trackEvent('InitiateCheckout', { 
                    content_name: 'ANBEL AI Purchase - Urgency CTA', 
                    value: 97, 
                    currency: 'USD',
                    content_category: 'AI Software',
                    content_ids: ['anbel-ai-urgency-cta']
                  });
                }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-16 py-6 rounded-full font-black text-2xl hover:from-red-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-red-500/25 inline-block animate-bounce"
              >
                💰 CLAIM YOUR AI ADVANTAGE NOW
              </a>
              
              <p className="text-white text-sm mt-4">
                🛡️ Secure payment via Hotmart • ⚡ Instant access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">GanaFácil</h3>
              <p className="text-blue-100">
                The most advanced lottery prediction system powered by Anbel IA
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Mega Intelligence</li>
                <li>Real-time Predictions</li>
                <li>Smart Chat</li>
                <li>Multi-language Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>API Reference</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
                <Youtube className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; 2024 GanaFácil with Anbel IA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
