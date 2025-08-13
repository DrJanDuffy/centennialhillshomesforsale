const crypto = require('node:crypto');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  skipWaiting: false,
  disable: true,
  runtimeCaching: [],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to work with Vercel
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath: '',
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  compress: true,

  images: {
    unoptimized: false, // Changed to false for Vercel
    domains: ['images.unsplash.com', 'cdn.pixabay.com', 'source.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // Bundle critical libraries together
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/](chart\.js|axios|lucide-react|framer-motion)[\\/]/,
            name: 'vendor',
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = crypto.createHash('sha1');
              hash.update(module.libIdent?.({ context: 'dir' }) || module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name: 'shared',
            minChunks: 1,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
      // Additional optimizations
      usedExports: true,
      sideEffects: false,
      concatenateModules: true,
    };

    // Tree shaking for better bundle size
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Production optimizations
    if (!dev) {
      // Enable bundle analyzer in production builds
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analysis.html',
          })
        );
      }
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);
