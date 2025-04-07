import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropertyDetails from '../../components/properties/PropertyDetails';
import { getPropertyDetails } from '../../utils/realscout';
import { Property } from '../../store/propertyStore';

interface PropertyPageProps {
  property: Property;
}

const PropertyPage = ({ property }: PropertyPageProps) => {
  const router = useRouter();

  // Show loading state while fallback is true
  if (router.isFallback) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#3A8DDE] border-t-transparent"></div>
          <p className="text-lg text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{property.title} | Centennial Hills Homes</title>
        <meta name="description" content={property.description} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description} />
        <meta property="og:image" content={property.imageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <PropertyDetails property={property} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real application, you might want to fetch the most popular/recent properties
  // and include their paths in the initial build
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PropertyPageProps> = async ({ params }) => {
  try {
    const propertyId = params?.id as string;
    const property = await getPropertyDetails(propertyId);

    return {
      props: {
        property,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching property details:', error);
    return {
      notFound: true,
    };
  }
};

export default PropertyPage; 