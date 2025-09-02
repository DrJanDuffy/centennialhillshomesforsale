import Head from 'next/head';
import { ConversionFunnelPage } from '../components/ConversionOptimizer';
import Layout from '../components/Layout';

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
    </Layout>
  );
}
