
import React from 'react';
import Head from 'next/head';

interface GoogleSearchConsoleProps {
  verificationCode?: string;
  siteUrl?: string;
}

export default function GoogleSearchConsole({
  verificationCode = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  siteUrl = 'https://centennialhillshomesforsale.com'
}: GoogleSearchConsoleProps) {

  return (
    <Head>
      {/* Google Search Console Verification */}
      {verificationCode && (
        <meta name="google-site-verification" content={verificationCode} />
      )}
      
      {/* Enhanced Meta Tags for Google Search */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Page Speed Insights */}
      <link rel="dns-prefetch" href="//www.google.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Rich Results Optimization */}
      <meta name="google" content="notranslate" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Core Web Vitals Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      
      {/* Indexing Hints */}
      <meta name="referrer" content="origin-when-cross-origin" />
    </Head>
  );
}
