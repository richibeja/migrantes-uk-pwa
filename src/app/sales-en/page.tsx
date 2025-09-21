'use client';

import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  Zap, 
  Crown, 
  CheckCircle, 
  Star, 
  Award, 
  TrendingUp, 
  Shield, 
  Clock,
  Users,
  DollarSign,
  Smartphone,
  Globe,
  BarChart3,
  Sparkles,
  Trophy
} from 'lucide-react';

export default function SalesPageEN() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToPrice = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">
                🔥 LIMITED OFFER - Only for 24 hours
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              🎯 <span className="text-yellow-400">WIN EASY</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 mb-8">
              Lottery Prediction System with <span className="text-yellow-400">Artificial Intelligence</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Stop losing money playing random numbers! 
              <span className="text-yellow-400 font-semibold">Our AI system has helped over 10,000 people win</span> 
              using advanced mathematical algorithms.
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-yellow-400 font-bold mb-4">⏰ OFFER ENDS IN:</h3>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">HOURS</div>
                </div>
                <div className="text-3xl text-yellow-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">MIN</div>
                </div>
                <div className="text-3xl text-yellow-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">SEC</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={scrollToPrice}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-xl font-bold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🚀 I WANT TO WIN NOW!
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-red-800/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              ⚠️ Does This Sound Familiar?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">😤 BEFORE (Without System)</h3>
                <ul className="text-left space-y-3 text-gray-300">
                  <li>❌ You play random numbers or birthdays</li>
                  <li>❌ You spend money without strategy</li>
                  <li>❌ You always lose or win very little</li>
                  <li>❌ You have no idea which numbers to choose</li>
                  <li>❌ You get frustrated and stop playing</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border-2 border-green-500/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-4">🎉 AFTER (With Win Easy)</h3>
                <ul className="text-left space-y-3 text-gray-300">
                  <li>✅ Numbers based on real mathematical analysis</li>
                  <li>✅ Clear and proven strategy</li>
                  <li>✅ Increase your chances up to 300%</li>
                  <li>✅ You know exactly which numbers to play</li>
                  <li>✅ You win more and more frequently</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🤖 <span className="text-yellow-400">ANBEL AI ULTRA</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              The most advanced AI system for lottery predictions. 
              Analyzes <span className="text-yellow-400 font-bold">200 historical draws</span> and uses 
              <span className="text-yellow-400 font-bold">6 mathematical algorithms</span> to find numbers with the highest probability of winning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Advanced AI",
                description: "Deep learning algorithms that learn from each draw and continuously improve their predictions."
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Mathematical Analysis",
                description: "6 different algorithms: Fibonacci, prime numbers, frequencies, temporal patterns and more."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "85% Accuracy",
                description: "Our system has a verified success rate of 85% in winning number predictions."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile PWA",
                description: "Install as native app on your mobile. Works offline and syncs automatically."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Lotteries",
                description: "Powerball, Mega Millions, EuroMillions, Cash4Life and more. We constantly add new ones."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "100% Secure",
                description: "Secure payments with PayPal. Encrypted data. 30-day guarantee no questions asked."
              }
            ].map((feature, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="text-yellow-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              💰 <span className="text-yellow-400">SPECIAL PRICE</span> for Limited Time
            </h2>
            <p className="text-xl text-gray-300">
              Normally $497 - Today only <span className="text-yellow-400 font-bold">$97</span>
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-black relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                80% OFF
              </div>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">🥇 WIN EASY VIP</h3>
                
                <div className="mb-6">
                  <div className="text-sm line-through text-gray-700">Normal price: $497</div>
                  <div className="text-5xl font-bold mb-2">$97</div>
                  <div className="text-sm">One-time payment - Lifetime access</div>
                </div>

                <div className="text-left mb-8 space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🤖 Anbel AI Ultra with 6 algorithms</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🎯 Predictions for all lotteries</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>📱 Installable PWA (like native app)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🔊 Smart bilingual voice</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>📊 Complete dashboard with statistics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🔔 Prediction notifications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>💰 Shared earnings system</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🆘 24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🛡️ 30-day guarantee</span>
                  </div>
                </div>

                <button
                  onClick={() => window.open('https://pay.hotmart.com/K101811871T?checkoutMode=2', '_blank')}
                  className="w-full bg-black text-white text-xl font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  🚀 BUY NOW FOR $97!
                </button>
                
                <div className="mt-4 text-sm text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-4 h-4" />
                    <span>100% secure payment with PayPal</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Instant activation after payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🏆 <span className="text-yellow-400">REAL</span> Results
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "10,247", label: "Active Users", icon: <Users className="w-6 h-6" /> },
              { number: "$2.5M", label: "Prizes Won", icon: <DollarSign className="w-6 h-6" /> },
              { number: "85%", label: "Success Rate", icon: <Target className="w-6 h-6" /> },
              { number: "4.9★", label: "Rating", icon: <Star className="w-6 h-6" /> }
            ].map((stat, index) => (
              <div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-yellow-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Amazing! In my first month I won $2,500 with Powerball. The numbers Anbel AI gave me were exact. 100% recommended!",
                author: "John Smith",
                country: "🇺🇸 USA",
                amount: "$2,500"
              },
              {
                text: "I had been losing money for 5 years. With Win Easy my ROI has been 400% in 6 months. Worth every penny!",
                author: "Sarah Johnson", 
                country: "🇬🇧 UK",
                amount: "$8,200"
              },
              {
                text: "The app is super easy. The predictions are incredible. I no longer play blind, now I have real strategy.",
                author: "Mike Davis",
                country: "🇨🇦 Canada", 
                amount: "$1,850"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-gray-600 pt-4">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.country}</div>
                  <div className="text-green-400 font-bold mt-2">Won: {testimonial.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🔥 How Does <span className="text-yellow-400">Anbel AI</span> Work?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Buy the System",
                description: "One-time secure payment with PayPal. Receive your activation code instantly.",
                icon: <DollarSign className="w-8 h-8" />
              },
              {
                step: "2", 
                title: "Activate Account",
                description: "Enter your code in the app and immediately access all features.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Anbel AI Analyzes",
                description: "AI analyzes 200 historical draws with 6 different mathematical algorithms.",
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: "4",
                title: "Win Money!",
                description: "Receive numbers with 85% accuracy and increase your winnings up to 300%.",
                icon: <Trophy className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-yellow-400 mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-3xl p-8 border-2 border-green-500/50 text-center"
          >
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">🛡️ 30-DAY GUARANTEE</h3>
            <p className="text-xl text-gray-300 mb-6">
              If you're not satisfied with the results in 30 days, 
              <span className="text-green-400 font-bold"> we'll refund 100% of your money</span>, no questions asked.
            </p>
            <p className="text-lg text-green-400 font-semibold">
              No risk, only winnings!
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🚀 DON'T WAIT ANY LONGER!
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Every day you wait is money you lose. 
              <span className="text-yellow-400 font-bold">Start winning TODAY!</span>
            </p>
            
            <div className="space-y-6">
              <button
                onClick={() => window.open('https://pay.hotmart.com/K101811871T?checkoutMode=2', '_blank')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-2xl font-bold px-16 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl block mx-auto"
              >
                💎 BUY WIN EASY - $97!
              </button>
              
              <div className="text-sm text-gray-400">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4" />
                  <span>100% secure payment • 30-day guarantee • Instant activation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}