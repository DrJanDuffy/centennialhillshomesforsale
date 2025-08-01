import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import GoogleSearchConsole from './GoogleSearchConsole';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  structuredData?: any;
  isPropertyPage?: boolean;
  propertyData?: {
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    neighborhood: string;
    images: string[];
  };
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Centennial Hills Homes For Sale | Dr. Jan Duffy | Las Vegas Luxury Real Estate",
  description = "Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in Providence, Skye Canyon, and Northwest Las Vegas luxury real estate.",
  canonical,
  image = "https://centennialhillshomesforsale.com/images/og-image.jpg",
  structuredData,
  isPropertyPage = false,
  propertyData
}) => {
  const router = useRouter();
  const currentUrl = canonical || `https://centennialhillshomesforsale.com${router.asPath}`;

  // Generate page-specific meta tags
  const getPageMeta = () => {
    const path = router.pathname;
    
    switch (path) {
      case '/':
        return {
          title: "Centennial Hills Homes For Sale | Dr. Jan Duffy | Las Vegas Luxury Real Estate",
          description: "Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in Providence, Skye Canyon, and Northwest Las Vegas luxury real estate.",
          keywords: "Centennial Hills homes for sale, Las Vegas luxury real estate, Providence homes, Skye Canyon properties, Dr. Jan Duffy REALTOR"
        };
      case '/centennial-hills':
        return {
          title: "Centennial Hills Homes For Sale | Luxury Real Estate Las Vegas | Dr. Jan Duffy",
          description: "Find luxury homes for sale in Centennial Hills, Las Vegas. Exclusive properties with mountain views, top schools, and premium amenities. Dr. Jan Duffy, Top 1% REALTOR®.",
          keywords: "Centennial Hills homes for sale, Centennial Hills Las Vegas, luxury homes Centennial Hills, mountain view homes Las Vegas"
        };
      case '/providence-las-vegas':
        return {
          title: "Providence Homes For Sale | Family Neighborhood Las Vegas | Dr. Jan Duffy",
          description: "Discover family-friendly homes in Providence, Las Vegas. Top-rated schools, parks, and community amenities. Dr. Jan Duffy specializes in Providence real estate.",
          keywords: "Providence homes for sale, Providence Las Vegas, family homes Providence, Providence neighborhood Las Vegas"
        };
      case '/skye-canyon':
        return {
          title: "Skye Canyon Homes For Sale | Outdoor Lifestyle Community | Dr. Jan Duffy",
          description: "Explore homes in Skye Canyon, Las Vegas' premier outdoor lifestyle community. Hiking trails, parks, and active living. Dr. Jan Duffy, luxury real estate expert.",
          keywords: "Skye Canyon homes for sale, Skye Canyon Las Vegas, outdoor lifestyle homes, hiking trails Las Vegas"
        };
      case '/buyers':
        return {
          title: "Home Buyers Guide | Centennial Hills Real Estate | Dr. Jan Duffy",
          description: "Expert guidance for homebuyers in Centennial Hills, Providence, and Skye Canyon. Get professional support from Dr. Jan Duffy, Top 1% REALTOR®.",
          keywords: "home buyers guide, Centennial Hills real estate, first time homebuyer Las Vegas, luxury home buying"
        };
      case '/blog':
        return {
          title: "Real Estate Blog | Centennial Hills Market Insights | Dr. Jan Duffy",
          description: "Stay informed with the latest real estate insights, market updates, and neighborhood guides for Centennial Hills, Providence, and Skye Canyon.",
          keywords: "Centennial Hills real estate blog, Las Vegas market updates, luxury real estate insights, neighborhood guides"
        };
      case '/search':
        return {
          title: "Search Homes | Centennial Hills Real Estate | Dr. Jan Duffy",
          description: "Search luxury homes for sale in Centennial Hills, Providence, and Skye Canyon. Find your dream home with Dr. Jan Duffy's expert guidance.",
          keywords: "search homes Centennial Hills, luxury homes Las Vegas, property search, real estate listings"
        };
      default:
        return {
          title,
          description,
          keywords: "Centennial Hills homes for sale, Las Vegas luxury real estate, Dr. Jan Duffy REALTOR"
        };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <>
      <GoogleSearchConsole
        pageTitle={pageMeta.title}
        pageDescription={pageMeta.description}
        pageUrl={currentUrl}
        structuredData={structuredData}
        isPropertyPage={isPropertyPage}
        propertyData={propertyData}
      />
      
      <Head>
        {/* Additional SEO Meta Tags */}
        <meta name="keywords" content={pageMeta.keywords} />
        <meta name="author" content="Dr. Jan Duffy" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
        
        {/* Review Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AggregateRating",
              "itemReviewed": {
                "@type": "RealEstateAgent",
                "name": "Dr. Jan Duffy"
              },
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            })
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What makes Centennial Hills a great place to live?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Centennial Hills offers luxury homes with mountain views, top-rated schools, premium amenities, and a family-friendly community atmosphere in Northwest Las Vegas."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "How can Dr. Jan Duffy help me buy a home?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dr. Jan Duffy provides comprehensive buyer services including MLS access, financing guidance, negotiation support, and expert market knowledge of Centennial Hills, Providence, and Skye Canyon."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;