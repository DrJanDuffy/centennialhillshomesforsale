
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  trailingSlash: true, // Recommended for static hosting
  images: {
    unoptimized: true, // Required for static export
    loader: 'custom',
    loaderFile: './utils/imageLoader.js'
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
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
