# 🎯 Gana Fácil — AI-Powered Lottery Predictions

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/docs/app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.2.1-orange?logo=firebase)](https://firebase.google.com/docs/web)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/learn/pwa/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Gana Fácil** is an advanced AI-powered lottery prediction system focused on the UK market. It provides intelligent predictions for UK, European, and USA lotteries using sophisticated algorithms and real-time data.

## 🌍 **Target Market: United Kingdom**

Designed specifically for the UK market with support for:
- 🇬🇧 **UK Lotteries**: National Lottery, Thunderball, Set For Life
- 🇪🇺 **European Lotteries**: EuroMillions, EuroMillions HotPicks  
- 🇺🇸 **USA Lotteries**: Powerball, Mega Millions

## ✨ Key Features

### 🤖 **Anbel AI Assistant**
- Intelligent conversational AI in English and Spanish
- Voice recognition and text-to-speech capabilities
- Lottery ticket analysis using computer vision
- Real-time predictions with confidence scores
- 25+ advanced AI capabilities

### 🎯 **Advanced Predictions**
- Multiple prediction algorithms (Advanced, Frequency, Pattern-based)
- Real-time lottery results integration
- Historical data analysis (100+ draws per lottery)
- Confidence and accuracy calculations
- Smart number pattern recognition

### 📊 **Comprehensive Dashboard**
- Real-time lottery results from official APIs
- Prediction history and performance tracking
- Statistical analysis and trends
- Gamification with points, levels, and achievements
- Multi-lottery support in one interface

### 🌐 **Multi-Lottery Support**
- **UK**: National Lottery, Thunderball, Set For Life
- **Europe**: EuroMillions, EuroMillions HotPicks
- **USA**: Powerball, Mega Millions
- Currency conversion (GBP, EUR, USD)
- Timezone-aware draw schedules

### 💰 **Payment & Subscriptions**
- PayPal integration
- Hotmart marketplace integration
- WhatsApp activation system
- Multiple subscription tiers
- Free trial available

### 📱 **Progressive Web App (PWA)**
- Install on any device (iOS, Android, Desktop)
- Offline functionality
- Push notifications
- Fast, app-like experience
- Auto-updates

### 🔒 **Security & Privacy**
- Firebase Authentication
- Encrypted data storage
- GDPR compliant
- UK gambling regulations compliant
- Secure payment processing

### 🌍 **Bilingual Support**
- Full English interface
- Complete Spanish interface
- Auto-language detection
- Real-time language switching

## 🛠 Technologies

**Frontend:**
- Next.js 15.5.3 (App Router)
- React 19.1.1
- TypeScript 5.2.2
- Tailwind CSS 3.4
- Material-UI 7.3.2

**Backend & Infrastructure:**
- Firebase 12.2.1 (Auth, Firestore, Storage, Analytics)
- Vercel (Hosting & Edge Functions)
- Next PWA (Service Workers)

**AI & Machine Learning:**
- Brain.js (Neural Networks)
- Natural (NLP)
- Custom prediction algorithms
- Pattern recognition systems

**APIs & Integrations:**
- UK National Lottery API
- EuroMillions API
- USA Lottery Data API (NY.gov)
- PayPal Payment API
- Hotmart Integration

## 📁 Project Structure

```
gana-facil/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── anbel-ai/            # AI Chat interface (ES)
│   │   ├── anbel-ai-en/         # AI Chat interface (EN)
│   │   ├── dashboard/           # Main dashboard
│   │   ├── predictions/         # Predictions page
│   │   ├── admin/               # Admin panel
│   │   ├── clubs/               # Lottery clubs
│   │   ├── auth/                # Authentication
│   │   └── api/                 # API routes
│   ├── components/              # React components (76 files)
│   │   ├── ai/                  # AI components
│   │   ├── chatbot/             # Chatbot components
│   │   ├── pwa/                 # PWA components
│   │   └── ...
│   ├── lib/                     # Core utilities (49 files)
│   │   ├── firebase.ts          # Firebase config
│   │   ├── anbel-ai.ts          # AI engine
│   │   ├── predictions.ts       # Prediction logic
│   │   └── ...
│   ├── hooks/                   # Custom React hooks (11 files)
│   ├── algorithms/              # ML algorithms (6 files)
│   ├── config/                  # Configuration files
│   ├── types/                   # TypeScript definitions
│   └── ...
├── public/                      # Static assets
│   ├── icons/                   # PWA icons
│   ├── audio/                   # Voice files
│   └── ...
├── functions/                   # Firebase Functions
├── docs/                        # Documentation
└── ...
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration (REQUIRED)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Application
NEXT_PUBLIC_APP_URL=https://ganafacil.app
NEXT_PUBLIC_TARGET_MARKET=uk
NEXT_PUBLIC_DEFAULT_CURRENCY=GBP
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Payment Integration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
NEXT_PUBLIC_HOTMART_PRODUCT_ID=your_hotmart_product_id

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+447123456789
```

See `.env.example` for complete list of variables.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Firebase account
- PayPal/Hotmart account (for payments)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/gana-facil.git
cd gana-facil
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## 📱 **Main Routes**

### Public Routes
- `/` - Landing page with features and pricing
- `/page-en` - English version of landing page
- `/auth/login` - User login
- `/auth/register-en` - User registration (English)
- `/auth/register-es` - User registration (Spanish)
- `/activate-whatsapp` - WhatsApp activation
- `/activate-code` - Code activation
- `/demo-ia` - Free AI demo

### Protected Routes (Requires Authentication)
- `/dashboard` - Main dashboard with predictions
- `/dashboard-en` - Dashboard (English version)
- `/anbel-ai` - AI chat interface (Spanish)
- `/anbel-ai-en` - AI chat interface (English)
- `/predictions` - Lottery predictions
- `/clubs` - Lottery clubs/groups
- `/profile` - User profile
- `/referrals` - Referral program

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/codes` - Code management
- `/admin/payments` - Payment management
- `/admin/analytics` - Analytics and statistics

## 🔒 Privacy & Compliance

### GDPR Compliance
- ✅ Data minimization principles
- ✅ User consent management
- ✅ Right to access data
- ✅ Right to delete data
- ✅ Data portability
- ✅ Privacy policy and terms

### UK Gambling Regulations
- ⚠️ **Disclaimer**: This system provides predictions for entertainment and educational purposes only
- ⚠️ **No Gambling License Required**: We do not operate as a gambling operator
- ⚠️ **Age Restriction**: Must be 18+ to use
- ⚠️ **Responsible Gaming**: Links to gambling support resources

### Security Measures
- Encrypted data transmission (HTTPS)
- Secure authentication (Firebase Auth)
- Regular security audits
- OWASP compliance

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login and deploy:**
```bash
vercel login
vercel link
vercel --prod
```

3. **Configure environment variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Redeploy

### Deploying Firebase Functions

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase:**
```bash
firebase login
```

3. **Deploy functions and rules:**
```bash
cd functions
npm install
npm run build
cd ..

firebase deploy --only "functions,firestore:rules"
```

**Available Functions:**
- `reserveUserCode` - Reserve unique user codes
- `reserveCaseCode` - Reserve unique case codes
- `onPaymentValidated` - Handle payment validation

### Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Storage
5. Copy configuration to `.env.local`

## 🧪 Testing

### Quick Test Plan

1. **Authentication:**
   - Register new user
   - Login/logout
   - Activate with code

2. **Predictions:**
   - Generate predictions for UK Lotto
   - Generate predictions for Powerball
   - View prediction history

3. **AI Chat:**
   - Chat with Anbel AI
   - Analyze lottery ticket
   - Voice interaction

4. **Payment:**
   - Activate subscription
   - Process PayPal payment
   - WhatsApp activation

5. **PWA:**
   - Install on mobile device
   - Test offline functionality
   - Receive push notifications

## 🗺️ Roadmap

### Q1 2025
- ✅ UK market launch
- ✅ Powerball & Mega Millions integration
- ✅ AI chat assistant
- ⏳ Mobile app (iOS/Android)

### Q2 2025
- ⏳ Additional UK lotteries
- ⏳ Advanced analytics
- ⏳ Social features
- ⏳ Referral program expansion

### Q3 2025
- ⏳ European market expansion
- ⏳ API for third-party integration
- ⏳ White-label solution
- ⏳ Advanced AI models

### Future
- Multi-currency support
- Blockchain integration
- NFT rewards
- Mobile native apps

## 🐛 Troubleshooting

**PWA not installing:**
- Ensure you're using HTTPS
- Check browser compatibility
- Clear cache and retry

**Predictions not loading:**
- Check Firebase configuration
- Verify API endpoints
- Check network connection

**Payment not processing:**
- Verify PayPal credentials
- Check Hotmart integration
- Review error logs

**AI chat not responding:**
- Check Firebase connection
- Verify authentication
- Clear browser cache

## 📞 Support

- 📧 Email: support@ganafacil.app
- 💬 WhatsApp: +447123456789
- 🌐 Website: https://ganafacil.app
- 📚 Documentation: https://docs.ganafacil.app

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

## ⚠️ Disclaimer

**Gana Fácil provides lottery predictions for entertainment and educational purposes only. We do not guarantee wins. Gambling can be addictive - please play responsibly.**

- Must be 18+ to use
- Not a gambling operator
- No financial advice
- Use at your own risk

For gambling support: [GamCare UK](https://www.gamcare.org.uk)

---

**Made with ❤️ for the UK Lottery Community**
