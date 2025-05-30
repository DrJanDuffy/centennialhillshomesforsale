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
          onError="console.error('Failed to load RealScout widget script')"
        ></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Ensure buttons work on page load
            document.addEventListener('DOMContentLoaded', function() {
              // Add click handlers for all buttons
              const buttons = document.querySelectorAll('.btn, button, [role="button"]');
              buttons.forEach(button => {
                if (!button.onclick && !button.href) {
                  button.style.cursor = 'pointer';
                  button.addEventListener('click', function(e) {
                    console.log('Button clicked:', this);
                  });
                }
              });

              // Handle phone number links
              const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
              phoneLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                  console.log('Phone link clicked:', this.href);
                });
              });

              // Handle contact form buttons
              const contactButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
              contactButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                  if (this.tagName === 'A') return; // Let links work normally
                  console.log('Contact button clicked');
                });
              });
            });
          `
        }} />
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
              width: 100%;
              min-height: 400px;
              display: block;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              background: #ffffff;
            }

            .realscout-loading {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 300px;
              padding: 40px;
              text-align: center;
              color: #6b7280;
            }

            .realscout-error {
              padding: 20px;
              background: #fef2f2;
              border: 1px solid #fecaca;
              border-radius: 8px;
              color: #dc2626;
              text-align: center;
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