import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        
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
        
        {/* RealScout Web Components Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}