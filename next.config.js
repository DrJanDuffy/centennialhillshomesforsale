
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  generateStaticParams: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './utils/imageLoader.js'
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    esmExternals: false
  },
  async rewrites() {
    return [];
  },
  async exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/services': { page: '/services' },
      '/listings': { page: '/listings' },
      '/centennial-hills': { page: '/centennial-hills' },
      '/providence-las-vegas': { page: '/providence-las-vegas' },
      '/skye-canyon': { page: '/skye-canyon' },
      '/northwest-las-vegas': { page: '/northwest-las-vegas' },
      '/neighborhoods': { page: '/neighborhoods' },
      '/market-update': { page: '/market-update' },
      '/testimonials': { page: '/testimonials' },
      '/faq': { page: '/faq' },
      '/las-vegas-89149': { page: '/las-vegas-89149' },
      '/las-vegas-89166': { page: '/las-vegas-89166' }
    };
  }
}

module.exports = nextConfig
