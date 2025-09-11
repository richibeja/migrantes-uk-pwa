/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // output: 'export', // Comentado para permitir API routes en desarrollo
  // distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          { type: 'header', key: 'host', value: 'migrantes-uk-pwa.vercel.app' },
        ],
        destination: '/landing',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/favicon.svg',
      },
      {
        source: '/justicia.png',
        destination: '/justicia.svg',
      },
      {
        source: '/sw.js',
        destination: '/sw.js',
      },
    ];
  },
};
module.exports = nextConfig;
