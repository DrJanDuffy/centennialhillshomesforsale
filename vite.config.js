import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import compression from 'vite-plugin-compression';
import imagemin from 'vite-plugin-imagemin';
import sitemap from 'vite-plugin-sitemap';
import robots from 'vite-plugin-robots';
import pwa from 'vite-plugin-pwa';
import critical from 'vite-plugin-critical';
import html from 'vite-plugin-html';
import metaTags from 'vite-plugin-meta-tags';
import svgIcons from 'vite-plugin-svg-icons';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      polyfills: true
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false
    }),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    sitemap({
      hostname: 'https://centennialhillshomesforsale.com',
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 0.7,
      exclude: ['/admin/*', '/private/*']
    }),
    robots({
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/private/'],
      sitemap: 'https://centennialhillshomesforsale.com/sitemap.xml'
    }),
    pwa({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Centennial Hills Homes For Sale',
        short_name: 'Centennial Hills',
        description: 'Find your dream home in Centennial Hills, Las Vegas',
        theme_color: '#2C5282',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    critical({
      criticalUrl: 'https://centennialhillshomesforsale.com',
      criticalBase: './dist',
      criticalPages: [
        { uri: '/', template: 'index' },
        { uri: '/listings', template: 'listings' },
        { uri: '/neighborhoods', template: 'neighborhoods' }
      ]
    }),
    html({
      minify: true,
      inject: {
        data: {
          title: 'Centennial Hills Homes For Sale',
          description: 'Find your dream home in Centennial Hills, Las Vegas'
        }
      }
    }),
    metaTags({
      title: 'Centennial Hills Homes For Sale',
      description: 'Find your dream home in Centennial Hills, Las Vegas',
      openGraph: {
        title: 'Centennial Hills Homes For Sale',
        description: 'Find your dream home in Centennial Hills, Las Vegas',
        type: 'website',
        locale: 'en_US',
        url: 'https://centennialhillshomesforsale.com',
        site_name: 'Centennial Hills Homes For Sale',
        images: [
          {
            url: '/images/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Centennial Hills Homes For Sale'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        site: '@centennialhills',
        creator: '@DrJanDuffy',
        title: 'Centennial Hills Homes For Sale',
        description: 'Find your dream home in Centennial Hills, Las Vegas',
        image: '/images/twitter-image.jpg'
      }
    }),
    svgIcons({
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        buyers: resolve(__dirname, 'buyers.html'),
        contact: resolve(__dirname, 'contact.html'),
        homebot: resolve(__dirname, 'homebot.html'),
        listings: resolve(__dirname, 'listings.html'),
        marketUpdate: resolve(__dirname, 'market-update.html'),
        neighborhoods: resolve(__dirname, 'neighborhoods.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        sellers: resolve(__dirname, 'sellers.html'),
        testimonials: resolve(__dirname, 'testimonials.html')
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "css/scss/utils/_variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: ['default', {
            discardComments: {
              removeAll: true,
              removeAllButFirst: true
            }
          }]
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@assets': resolve(__dirname, './assets'),
      '@components': resolve(__dirname, './components'),
      '@styles': resolve(__dirname, './css/scss')
    }
  }
}); 