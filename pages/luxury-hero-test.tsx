import Head from 'next/head';
import type React from 'react';
import LuxuryHeroSection from '../components/LuxuryHeroSection';

const LuxuryHeroTest: React.FC = () => {
  return (
    <>
      <Head>
        <title>Luxury Hero Section Test - Centennial Hills Real Estate</title>
        <meta name="description" content="Test page for the luxury hero section component" />
      </Head>

      <LuxuryHeroSection />
    </>
  );
};

export default LuxuryHeroTest;

