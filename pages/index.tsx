import Head from 'next/head';
import { useId } from 'react';

import ConversionOptimizer from '../components/ConversionOptimizer';
import {
  AgentSpotlight,
  BottomCta,
  ExploreCards,
  HomeHero,
} from '../components/home/HomePageEnhancements';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';
import FeaturedInsight from '../components/rss/FeaturedInsight';
import SimpleInteriorGallery from '../components/SimpleInteriorGallery';
import { getPhotosForPage } from '../utils/interiorPhotos';

const LISTINGS_SECTION_ID = 'featured-listings';

export default function Home() {
  const businessSchemaId = useId();
  return (
    <Layout>
      <Head>
        <title>Centennial Hills Homes for Sale | Dr. Jan Duffy | Luxury Real Estate</title>
        <meta
          name="description"
          content="Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in luxury properties and master-planned communities."
        />
        <meta
          name="keywords"
          content="Centennial Hills homes for sale, luxury real estate Las Vegas, Dr. Jan Duffy, Providence neighborhood, Skye Canyon, northwest Las Vegas"
        />

        {/* Enhanced Business Schema for SEO */}
        <script type="application/ld+json" id={businessSchemaId} />
      </Head>

      <HomeHero listingsSectionId={LISTINGS_SECTION_ID} />

      <RealScoutListingsSection
        id={LISTINGS_SECTION_ID}
        title="Featured Properties"
        subtitle="Discover our handpicked selection of luxury homes in Centennial Hills. Each property is carefully selected for its exceptional quality, prime location, and outstanding value."
        className="py-20 bg-white"
      />

      <ExploreCards />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SimpleInteriorGallery
            photos={getPhotosForPage('homepage')}
            title="Interior Inspiration"
            subtitle="Discover the stunning interior designs and premium finishes that make Centennial Hills homes truly special"
            maxPhotos={6}
          />
        </div>
      </section>

      <AgentSpotlight />

      <FeaturedInsight
        title="Latest Market Insight"
        subtitle="Stay informed with expert analysis from Keeping Current Matters"
        theme="blue"
        enableAnalytics={true}
        enablePerformance={true}
      />

      <BottomCta listingsSectionId={LISTINGS_SECTION_ID} />

      <ConversionOptimizer />
    </Layout>
  );
}
