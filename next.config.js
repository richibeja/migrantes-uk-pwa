// next.config.js - CONFIGURACIÓN SIMPLIFICADA PARA VERCEL
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [
    /app-build-manifest\.json$/,
    /middleware-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /dynamic-css-manifest\.json$/,
    /_middleware\.js$/,
    /_next\/app-build-manifest\.json$/,
    /_next\/middleware-manifest\.json$/,
    /_next\/react-loadable-manifest\.json$/,
    /_next\/dynamic-css-manifest\.json$/,
    /\.map$/,
    /_redirects/
  ]
});

module.exports = withPWA({
  reactStrictMode: true,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'recharts']
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  images: {
    domains: [
      "localhost", 
      "ganafacil.vercel.app", // Dominio fijo configurado
      "api.anbel-ia.com",
      "data.powerball.com",
      "data.megamillions.com",
      "data.euromillions.com"
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https: *.facebook.com *.fbcdn.net *.google.com *.google-analytics.com *.googletagmanager.com *.doubleclick.net *.hotmart.com *.buildstaging.com *.ebanx.com *.worldpay.com *.payulatam.com *.paypal.com *.paypalobjects.com *.dlocal.com *.y.uno *.sequrapi.com *.sift.com *.k-analytix.com; img-src 'self' data: https: *; connect-src 'self' https: wss: *; frame-src 'self' https: *; style-src 'self' 'unsafe-inline' https: *; font-src 'self' data: https: *;"
          }
        ]
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dashboard-simple',
        destination: '/admin-simple',
        permanent: true,
      }
    ];
  },

  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true
          }
        }
      };
    }

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
      };
    }

    return config;
  },

  outputFileTracingRoot: __dirname,
  
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
});
