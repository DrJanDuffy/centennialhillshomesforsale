import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';

type NeighborhoodName =
  | 'Centennial Hills'
  | 'The Trails'
  | 'Tournament Hills'
  | 'Skye Canyon'
  | 'Sun City Aliante';

const neighborhoodData: Record<
  NeighborhoodName,
  {
    description: string;
    medianPrice: string;
    avgSqft: string;
    yearBuilt: string;
    highlights: string[];
    zipCodes: string[];
    coordinates: { lat: number; lng: number };
  }
> = {
  'Centennial Hills': {
    description:
      'Master-planned community with luxury homes, championship golf, and family amenities',
    medianPrice: '$650,000',
    avgSqft: '2,800',
    yearBuilt: '2005-2020',
    highlights: ['TPC Las Vegas Golf Course', 'Downtown Summerlin nearby', 'A+ rated schools'],
    zipCodes: ['89149', '89166'],
    coordinates: { lat: 36.272, lng: -115.327 },
  },
  'The Trails': {
    description: 'Established community featuring custom homes and mature landscaping',
    medianPrice: '$580,000',
    avgSqft: '2,600',
    yearBuilt: '1995-2010',
    highlights: ['Mature trees and landscaping', 'Walking trails throughout', 'Close to shopping'],
    zipCodes: ['89149'],
    coordinates: { lat: 36.265, lng: -115.315 },
  },
  'Tournament Hills': {
    description: 'Golf course community with stunning mountain and city views',
    medianPrice: '$720,000',
    avgSqft: '3,200',
    yearBuilt: '2000-2015',
    highlights: ["Bear's Best Golf Course", 'Mountain views', 'Gated sections'],
    zipCodes: ['89149'],
    coordinates: { lat: 36.28, lng: -115.34 },
  },
  'Skye Canyon': {
    description: 'Newer master-planned community with modern amenities and parks',
    medianPrice: '$590,000',
    avgSqft: '2,700',
    yearBuilt: '2010-2023',
    highlights: ['Skye Canyon Park', 'New construction available', 'Family-friendly amenities'],
    zipCodes: ['89166'],
    coordinates: { lat: 36.285, lng: -115.35 },
  },
  'Sun City Aliante': {
    description: 'Active adult 55+ community with resort-style amenities',
    medianPrice: '$480,000',
    avgSqft: '2,200',
    yearBuilt: '2005-2018',
    highlights: ['55+ community', 'Golf course and clubhouse', 'Resort amenities'],
    zipCodes: ['89084'],
    coordinates: { lat: 36.29, lng: -115.37 },
  },
};

export default function Neighborhoods() {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodName>('Centennial Hills');
  const currentData = neighborhoodData[selectedNeighborhood];

  return (
    <Layout>
      <Head>
        <title>Neighborhoods in Centennial Hills Las Vegas | Complete Area Guide</title>
        <meta
          name="description"
          content="Explore neighborhoods in Centennial Hills including The Trails, Tournament Hills, Skye Canyon. Find homes, schools, and amenities in each area."
        />
        <meta
          name="keywords"
          content="Centennial Hills neighborhoods, The Trails Las Vegas, Tournament Hills homes, Skye Canyon community, Sun City Aliante"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/neighborhoods" />
      </Head>

      <main className="container">
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Neighborhoods in Centennial Hills Area</h1>
          <p>
            Discover the unique character and amenities of each neighborhood in the greater
            Centennial Hills area. From established communities to new master-planned developments,
            find your perfect Las Vegas home.
          </p>
        </motion.section>

        <NeighborhoodBar
          currentNeighborhood={selectedNeighborhood}
          onNeighborhoodChange={setSelectedNeighborhood}
        />

        <motion.section
          className="neighborhood-details"
          key={selectedNeighborhood}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="neighborhood-header">
            <h2>{selectedNeighborhood}</h2>
            <p className="neighborhood-description">{currentData.description}</p>
          </div>

          {/* RealScout Your Listings */}
          <div className="section">
            <div className="text-center mb-8">
              <h3>Your Listings</h3>
              <p>Browse our latest properties in {selectedNeighborhood} and surrounding areas</p>
            </div>
            <realscout-your-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale,Sold"
              property-types="SFR"
              price-min="500000"
            ></realscout-your-listings>
          </div>

          <div className="neighborhood-highlights">
            <h3>Neighborhood Highlights</h3>
            <ul>
              {currentData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <SchoolInfo neighborhood={selectedNeighborhood} />

          {/* RealScout Office Listings */}
          <div className="listings-section">
            <h3>Available Homes in {selectedNeighborhood}</h3>
            <realscout-office-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale"
              property-types="SFR,MF,TC"
              price-min="600000"
              price-max="1200000"
            ></realscout-office-listings>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
