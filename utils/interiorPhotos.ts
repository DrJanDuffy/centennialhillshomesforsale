import interiorPhotosData from '../public/assets/images/interior-photos/index.json';

export interface InteriorPhoto {
  id: string;
  filename: string;
  alt: string;
  description: string;
  category: string;
  style: string;
  tags: string[];
}

export interface InteriorPhotosData {
  interiorPhotos: {
    livingRooms: InteriorPhoto[];
    kitchens: InteriorPhoto[];
    masterBedrooms: InteriorPhoto[];
    bathrooms: InteriorPhoto[];
    diningRooms: InteriorPhoto[];
    homeOffices: InteriorPhoto[];
    outdoorSpaces: InteriorPhoto[];
  };
  photoCategories: string[];
  styles: string[];
}

// Load all interior photos
export function getAllInteriorPhotos(): InteriorPhoto[] {
  const data = interiorPhotosData as InteriorPhotosData;
  return [
    ...data.interiorPhotos.livingRooms,
    ...data.interiorPhotos.kitchens,
    ...data.interiorPhotos.masterBedrooms,
    ...data.interiorPhotos.bathrooms,
    ...data.interiorPhotos.diningRooms,
    ...data.interiorPhotos.homeOffices,
    ...data.interiorPhotos.outdoorSpaces,
  ];
}

// Get photos by category
export function getPhotosByCategory(category: string): InteriorPhoto[] {
  const data = interiorPhotosData as InteriorPhotosData;
  const categoryKey = category as keyof typeof data.interiorPhotos;

  if (categoryKey in data.interiorPhotos) {
    return data.interiorPhotos[categoryKey];
  }

  return [];
}

// Get photos by style
export function getPhotosByStyle(style: string): InteriorPhoto[] {
  return getAllInteriorPhotos().filter((photo) => photo.style === style);
}

// Get featured photos (mix of different categories)
export function getFeaturedPhotos(count: number = 6): InteriorPhoto[] {
  const allPhotos = getAllInteriorPhotos();
  const featured: InteriorPhoto[] = [];

  // Get one photo from each major category
  const categories = [
    'livingRooms',
    'kitchens',
    'masterBedrooms',
    'bathrooms',
    'diningRooms',
    'outdoorSpaces',
  ];

  categories.forEach((category) => {
    const categoryPhotos = getPhotosByCategory(category);
    if (categoryPhotos.length > 0) {
      featured.push(categoryPhotos[0]);
    }
  });

  // Fill remaining slots with random photos
  while (featured.length < count && allPhotos.length > featured.length) {
    const remainingPhotos = allPhotos.filter((photo) => !featured.find((f) => f.id === photo.id));
    if (remainingPhotos.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingPhotos.length);
      featured.push(remainingPhotos[randomIndex]);
    }
  }

  return featured.slice(0, count);
}

// Get photos for specific page types
export function getPhotosForPage(pageType: string): InteriorPhoto[] {
  switch (pageType) {
    case 'homepage':
      return getFeaturedPhotos(6);
    case 'properties':
      return getFeaturedPhotos(9);
    case 'kitchens':
      return getPhotosByCategory('kitchens');
    case 'living-rooms':
      return getPhotosByCategory('livingRooms');
    case 'master-suites':
      return getPhotosByCategory('masterBedrooms');
    case 'bathrooms':
      return getPhotosByCategory('bathrooms');
    default:
      return getFeaturedPhotos(6);
  }
}

// Get random photos for variety
export function getRandomPhotos(count: number = 3): InteriorPhoto[] {
  const allPhotos = getAllInteriorPhotos();
  const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
