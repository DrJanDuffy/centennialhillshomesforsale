import Head from 'next/head';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';
import SimpleInteriorGallery from '../components/SimpleInteriorGallery';
import { getAllInteriorPhotos, getPhotosByCategory } from '../utils/interiorPhotos';

export default function InteriorPhotos() {
  const allPhotos = getAllInteriorPhotos();
  const livingRoomPhotos = getPhotosByCategory('livingRooms');
  const kitchenPhotos = getPhotosByCategory('kitchens');
  const masterBedroomPhotos = getPhotosByCategory('masterBedrooms');
  const bathroomPhotos = getPhotosByCategory('bathrooms');
  const diningRoomPhotos = getPhotosByCategory('diningRooms');
  const homeOfficePhotos = getPhotosByCategory('homeOffices');
  const outdoorPhotos = getPhotosByCategory('outdoorSpaces');

  return (
    <>
      <Head>
        <title>Interior Design Inspiration | Centennial Hills Homes | Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Explore stunning interior design inspiration from Centennial Hills luxury homes. See beautiful kitchens, living rooms, master suites, and more."
        />
        <meta
          name="keywords"
          content="interior design inspiration, luxury home interiors, Centennial Hills homes, kitchen design, master suite, bathroom design, Las Vegas luxury homes"
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Interior Design Inspiration</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the stunning interior designs and premium finishes that define luxury living
              in Centennial Hills
            </p>
          </div>
        </section>

        {/* Featured Interior Photos */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={allPhotos}
              title="Complete Interior Collection"
              subtitle="Browse our comprehensive collection of interior design inspiration from Centennial Hills luxury homes"
              maxPhotos={12}
            />
          </div>
        </section>

        {/* Living Rooms Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={livingRoomPhotos}
              title="Living Room Designs"
              subtitle="From cozy family spaces to elegant entertaining areas, discover living room designs that inspire"
            />
          </div>
        </section>

        {/* Kitchens Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={kitchenPhotos}
              title="Kitchen Excellence"
              subtitle="Explore gourmet kitchens with premium appliances, custom cabinetry, and stunning countertops"
            />
          </div>
        </section>

        {/* Master Bedrooms Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={masterBedroomPhotos}
              title="Master Suite Retreats"
              subtitle="Luxurious master bedrooms designed for comfort, relaxation, and mountain views"
            />
          </div>
        </section>

        {/* Bathrooms Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={bathroomPhotos}
              title="Spa-Inspired Bathrooms"
              subtitle="Luxurious bathrooms with premium fixtures, soaking tubs, and walk-in showers"
            />
          </div>
        </section>

        {/* Dining Rooms Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={diningRoomPhotos}
              title="Dining Spaces"
              subtitle="Beautiful dining areas perfect for hosting dinner parties and family gatherings"
            />
          </div>
        </section>

        {/* Home Offices Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={homeOfficePhotos}
              title="Home Office Solutions"
              subtitle="Productive workspaces designed for remote work and productivity"
            />
          </div>
        </section>

        {/* Outdoor Living Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SimpleInteriorGallery
              photos={outdoorPhotos}
              title="Outdoor Living Spaces"
              subtitle="Beautiful outdoor areas perfect for enjoying Las Vegas weather and mountain views"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to See These Interiors in Person?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule a private tour to experience the quality and craftsmanship of Centennial
              Hills luxury homes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Schedule a Tour
              </a>
              <a
                href="/properties"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-block"
              >
                View Properties
              </a>
            </div>
          </div>
        </section>
        {/* RealScout Office Listings */}
        <RealScoutListingsSection
          title="Current Listings"
          subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"
        />
      </Layout>
    </>
  );
}
