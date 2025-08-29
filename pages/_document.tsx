import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL - Force HTTPS and non-www */}
        <link rel="canonical" href="https://centennialhillshomesforsale.com" />

        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icon for iOS home screen */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="Centennial Hills Homes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Centennial Hills Homes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* 
          theme-color: Sets browser toolbar color on supported browsers (Chrome, Safari, Edge)
          Note: Firefox and Opera don't support this meta tag, but it's still beneficial for other browsers
          This is a progressive enhancement - browsers that support it will use it, others will ignore it
          Compatibility: Chrome 39+, Safari 15+, Edge 79+ (Firefox and Opera ignore this tag)
          These warnings are expected and can be safely ignored for cross-browser compatibility
        */}
        <meta name="theme-color" content="#2563eb" />

        {/* Light/Dark mode theme-color variants - Progressive enhancement for supported browsers */}
        <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />

        {/* Performance and Security */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* RealScout Web Components Script and Styles */}
        <script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
          defer
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            realscout-office-listings {
              --rs-listing-divider-color: #658dac;
              --rs-primary-color: #2563eb;
              --rs-hover-color: #1e40af;
              --rs-text-color: #1f2937;
              --rs-card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              width: 100%;
              display: block;
              min-height: 500px;
            }
            
            /* Responsive grid layout */
            realscout-office-listings::part(listings-grid) {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 1.5rem;
            }
            
            /* Card styling */
            realscout-office-listings::part(listing-card) {
              border-radius: 12px;
              overflow: hidden;
              transition: transform 0.3s ease;
            }
            
            realscout-office-listings::part(listing-card):hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            }
            
            /* Additional RealScout widget styles */
            realscout-search {
              --rs-listing-divider-color: #658dac;
              --rs-primary-color: #2563eb;
              width: 100%;
            }
            realscout-property-details {
              --rs-listing-divider-color: #658dac;
              --rs-primary-color: #2563eb;
              width: 100%;
            }
            realscout-market-analysis {
              --rs-listing-divider-color: #658dac;
              --rs-primary-color: #2563eb;
              width: 100%;
            }
          `,
          }}
        />

        {/* ==== MAP LIBRARY (Google Maps) ==== */}
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo&callback=initMap&libraries=places"
          async
          defer
        ></script>

        {/* ==== CHART.JS & AXIOS (bundled via webpack) ==== */}
        {/* Removed CDN calls - now bundled with webpack optimization */}

        {/* ==== MARKET CHARTS (custom functionality) ==== */}
        <script src="/js/market-charts.js" defer></script>

        {/* ==== PROPERTY MAP (Google Maps property listings) ==== */}
        <script src="/js/property-map.js" defer></script>

        {/* (Optional) If you ever want Recharts (React) instead of Chart.js, uncomment the line below */}
        {/* <script src="https://unpkg.com/recharts/umd/Recharts.min.js" defer></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
