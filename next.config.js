/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Fix cross-origin dev warnings
  allowedDevOrigins: [
    '6ded0d4f-9d2e-4715-a7f0-4bc64698a5b3-00-2jkuj00eza76g.spock.replit.dev',
    'localhost:5000',
    '0.0.0.0:5000'
  ],
  async rewrites() {
    return [
      {
        source: '/js/:path*',
        destination: '/public/js/:path*'
      }
    ];
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
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;