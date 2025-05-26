/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for development
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix for development
  // basePath: '/centennialhillshomesforsale',
  // assetPrefix: '/centennialhillshomesforsale/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add proper port configuration
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig; 