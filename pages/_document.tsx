import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module"
        ></script>
        <script src="/button-fixes.js" defer></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            // RealScout widget fallback
            window.addEventListener('load', function() {
              setTimeout(function() {
                const widgets = document.querySelectorAll('realscout-office-listings');
                widgets.forEach(widget => {
                  if (!widget.innerHTML.trim()) {
                    widget.innerHTML = '<p>Loading property listings... <a href="tel:+17029031952">Call (702) 903-1952</a> for immediate assistance.</p>';
                  }
                });
              }, 5000);
            });
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-office-listings {
              --rs-listing-divider-color: #4a90e2;
              --rs-background-color: #ffffff;
              --rs-text-color: #1f2937;
              --rs-primary-color: #2563eb;
              width: 100%;
              min-height: 400px;
              display: block;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              background: #ffffff !important;
              color: #1f2937 !important;
              pointer-events: auto !important;
              z-index: 1;
              position: relative;
            }

            realscout-office-listings * {
              pointer-events: auto !important;
              cursor: pointer;
            }

            realscout-office-listings a,
            realscout-office-listings button,
            realscout-office-listings [role="button"],
            realscout-office-listings .listing-card,
            realscout-office-listings .property-link {
              pointer-events: auto !important;
              cursor: pointer !important;
              user-select: auto !important;
              touch-action: manipulation !important;
            }

            .realscout-loading {
              padding: 2rem;
              text-align: center;
              color: #6b7280;
              border-radius: 8px;
              background: #f9fafb;
              border: 1px solid #e5e7eb;
            }

            /* Critical button fixes */
            button, .btn, .button, [role="button"], a {
              pointer-events: auto !important;
              cursor: pointer !important;
              user-select: auto !important;
              touch-action: manipulation !important;
              position: relative;
              z-index: 1;
            }

            button:disabled, .btn:disabled, .button:disabled {
              pointer-events: none !important;
              cursor: not-allowed !important;
              opacity: 0.6;
            }

            .cta-buttons a, .cta-buttons button, .contact-button {
              display: inline-block !important;
              pointer-events: auto !important;
              cursor: pointer !important;
              text-decoration: none;
              position: relative;
              z-index: 10;
            }

            .loading-spinner {
              width: 40px;
              height: 40px;
              border: 4px solid #e5e7eb;
              border-top: 4px solid #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 16px;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="centennial-hills-homes-verification" />
        <meta name="google-business-verification" content="centennial-hills-homes" />

        {/* Enhanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        <meta name="bingbot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

        {/* Geographic SEO */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas, Nevada" />
        <meta name="geo.position" content="36.268;-115.328" />
        <meta name="ICBM" content="36.268, -115.328" />

        {/* Local Business Information */}
        <meta name="locality" content="Las Vegas" />
        <meta name="region" content="Nevada" />
        <meta name="country" content="United States" />

        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Dr. Jan Duffy, REALTOR®",
              "telephone": "(702) 903-1952",
              "url": "https://centennialhillshomesforsale.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Providence Skye Canyon Dr",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "postalCode": "89166"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}