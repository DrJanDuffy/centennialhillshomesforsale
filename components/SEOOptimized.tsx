
import Head from 'next/head';
import { generateSchemaForPage } from '../scripts/generate-schema';

interface SEOOptimizedProps {
  title: string;
  description: string;
  keywords?: string;
  pageType?: string;
  canonicalUrl?: string;
  additionalSchema?: object[];
  localBusiness?: boolean;
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
  articleData?: {
    headline: string;
    datePublished: string;
    dateModified: string;
    author: string;
  };
}

export default function SEOOptimized({
  title,
  description,
  keywords,
  pageType = 'home',
  canonicalUrl,
  additionalSchema = [],
  localBusiness = true,
  faqData,
  articleData
}: SEOOptimizedProps) {
  const baseSchema = generateSchemaForPage(pageType);
  
  // Add FAQ schema if provided
  const faqSchema = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Add Article schema if provided
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.headline,
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified,
    "author": {
      "@type": "Person",
      "name": articleData.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
      "logo": {
        "@type": "ImageObject",
        "url": "https://centennialhillshomesforsale.com/images/logo.png"
      }
    }
  } : null;

  const allSchema = [
    ...baseSchema,
    ...additionalSchema,
    faqSchema,
    articleSchema
  ].filter(Boolean);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* AI Search Optimization */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Local Business Markup */}
      {localBusiness && (
        <>
          <meta name="geo.region" content="US-NV" />
          <meta name="geo.placename" content="Las Vegas" />
          <meta name="geo.position" content="36.268;-115.328" />
          <meta name="ICBM" content="36.268, -115.328" />
        </>
      )}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allSchema)
        }}
      />
      
      {/* AI-specific meta tags */}
      <meta name="AI-optimized" content="true" />
      <meta name="local-expertise" content="Centennial Hills, Providence, Skye Canyon, Summerlin Real Estate" />
      <meta name="market-data-updated" content={new Date().toISOString().split('T')[0]} />
      <meta name="realtor" content="Dr. Jan Duffy, Top 1% Las Vegas REALTOR®" />
      <meta name="business-phone" content="(702) 903-1952" />
    </Head>
  );
}
