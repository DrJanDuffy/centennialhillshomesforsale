
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.centennialhillshomesforsale\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
        }
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  
  // Enable static export for better performance
  output: 'export',
  
  // Optimize images for better performance
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './utils/imageLoader.js'
  },
  
  // Production optimizations
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: false
  },
  
  // Enable compression
  compress: true,
  
  // Optimize builds
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  
  // Environment variables
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
    SITE_URL: 'https://centennialhillshomesforsale.com'
  },
  
  // Headers for better performance
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
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
}

module.exports = withPWA(nextConfig);
