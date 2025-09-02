import Head from 'next/head';
import { ConversionFunnelPage } from '../components/ConversionOptimizer';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';

export default function ConversionFunnelPageRoute() {
  return (
    <Layout>
      <Head>
        <title>Your Real Estate Journey | Dr. Jan Duffy | Centennial Hills</title>
        <meta
          name="description"
          content="Track your personalized real estate journey with Dr. Jan Duffy. From awareness to purchase, we guide you every step of the way."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Conversion Funnel with Full Optimization */}
      <ConversionFunnelPage />
      {/* RealScout Office Listings */}
      <RealScoutListingsSection
        title="Current Listings"
        subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"
      />
    </Layout>
  );
}
