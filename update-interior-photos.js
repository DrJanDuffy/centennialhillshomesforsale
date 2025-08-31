/**
 * Update Interior Photos JSON
 * This script adds missing properties to match the Photo interface
 */

const fs = require('fs');
const path = require('path');

// Read the current JSON file
const jsonPath = path.join(__dirname, 'public/assets/images/interior-photos/index.json');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Helper function to add missing properties
function addMissingProperties(photo, category) {
  // Map category to roomType
  const roomTypeMap = {
    livingRoom: 'Living Room',
    kitchen: 'Kitchen',
    masterBedroom: 'Master Bedroom',
    bathroom: 'Master Bathroom',
    diningRoom: 'Dining Room',
    homeOffice: 'Home Office',
    outdoorSpace: 'Outdoor Space',
  };

  // Map style to colors
  const colorMap = {
    modern: ['Neutral', 'Gray', 'White'],
    luxury: ['Neutral', 'Gold', 'Cream'],
    traditional: ['Warm', 'Brown', 'Beige'],
    contemporary: ['Gray', 'Black', 'White'],
    farmhouse: ['White', 'Wood', 'Cream'],
    minimalist: ['White', 'Gray', 'Black'],
  };

  // Map style to features
  const featureMap = {
    modern: ['Clean lines', 'Open concept', 'Premium finishes'],
    luxury: ['Premium materials', 'High-end appliances', 'Custom details'],
    traditional: ['Classic design', 'Timeless appeal', 'Quality craftsmanship'],
    contemporary: ['Sleek design', 'Modern amenities', 'Sophisticated style'],
    farmhouse: ['Rustic charm', 'Country style', 'Warm atmosphere'],
    minimalist: ['Simple design', 'Clean aesthetic', 'Functional layout'],
  };

  return {
    ...photo,
    title: photo.alt || photo.description,
    roomType: roomTypeMap[category] || 'Other',
    colors: colorMap[photo.style] || ['Neutral', 'Gray'],
    features: featureMap[photo.style] || ['Quality design', 'Modern amenities'],
    dimensions: {
      width: 1920,
      height: 1080,
    },
  };
}

// Update all photos
Object.keys(jsonData.interiorPhotos).forEach((category) => {
  jsonData.interiorPhotos[category] = jsonData.interiorPhotos[category].map((photo) =>
    addMissingProperties(photo, category)
  );
});

// Write the updated JSON back to file
fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

console.log('✅ Interior photos JSON updated successfully!');
console.log('📋 Added missing properties: title, roomType, colors, features, dimensions');
