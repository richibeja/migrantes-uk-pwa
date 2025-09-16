// next.config.js - CONFIGURACIÓN OPTIMIZADA PARA PRODUCCIÓN
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
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 año
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-static',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 año
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 1 semana
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
        }
      }
    }
  ]
});

module.exports = withPWA({
  reactStrictMode: true,
  
  experimental: {
    optimizeCss: true, // Optimización CSS
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'recharts']
  },

  // Configuración de compilación optimizada
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Optimización de imágenes
  images: {
    domains: [
      "localhost", 
      "gana-facil-5fxy5qcd3-ganafacils-projects.vercel.app",
      "gana-facil-js2hq197j-ganafacils-projects.vercel.app",
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

  // Headers de seguridad y performance
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

  // Redirecciones para SEO
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

  // Configuración de webpack optimizada
  webpack: (config, { isServer, dev }) => {
    // Optimizaciones para producción
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

    // Optimización de bundle - Removido para evitar conflictos con cacheUnaffected
    // config.optimization.usedExports = true;
    // config.optimization.sideEffects = false;

    return config;
  },

  // Configuración de output
  outputFileTracingRoot: __dirname,
  
  // Configuración de TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },

  // Configuración de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configuración de performance
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
});