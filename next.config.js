/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'randomuser.me', 'placehold.co'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Optimize image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Additional image sizes
  },
  compress: true, // Enable compression
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true,
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
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  // Redirect /home to /
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      }
    ];
  }
};

module.exports = nextConfig; 