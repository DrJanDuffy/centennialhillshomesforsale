/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/centennialhillshomesforsale',
  assetPrefix: '/centennialhillshomesforsale/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 