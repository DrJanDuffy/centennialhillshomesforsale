const crypto = require('node:crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateBuildId: async () => {
    return `build-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },
  images: {
    unoptimized: false,
    domains: ['images.unsplash.com', 'cdn.pixabay.com', 'source.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      '@heroicons/react',
      'framer-motion',
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    optimizeServerReact: true,
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@cerebras/cerebras_cloud_sdk',
      '@drjanduffy/cerebras-service',
    ],
  },
  webpack: (config, { isServer, dev, webpack }) => {
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
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
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
            test: /[\\/]node_modules[\\/](chart\\.js|axios|lucide-react|framer-motion)[\\/]/,
            name: 'vendor',
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
          },
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|@headlessui)[\\/]/,
            name: 'ui',
            priority: 30,
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
            priority: 25,
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
      usedExports: true,
      sideEffects: false,
      concatenateModules: true,
      providedExports: true,
      innerGraph: true,
    };
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
    }
    if (!dev) {
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analysis.html',
            generateStatsFile: true,
            statsFilename: 'webpack-stats.json',
            logLevel: 'info',
            defaultSizes: 'gzip',
            reportTitle: 'Centennial Hills Homes - Bundle Analysis',
            startAnalyzer: false,
          })
        );
        config.devtool = dev ? 'eval-source-map' : 'source-map';
      }
    }
    return config;
  },
};

module.exports = nextConfig;
