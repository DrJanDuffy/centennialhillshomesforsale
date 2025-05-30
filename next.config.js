
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
