
const fs = require('fs');
const path = require('path');

// Create simple placeholder images for properties
const createPlaceholderImage = (filename, text) => {
  const svgContent = `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f0f0f0"/>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#666">
    ${text}
  </text>
</svg>`;
  
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'images', 'centennial-hills', filename), svgContent);
  console.log(`Created placeholder: ${filename}`);
};

// Create property placeholders
const properties = [
  { filename: 'property1.jpg', text: 'Providence Luxury Home' },
  { filename: 'property2.jpg', text: 'Skye Canyon Estate' },
  { filename: 'property3.jpg', text: 'The Canyons Home' },
  { filename: 'property4.jpg', text: 'The Trails Luxury' },
  { filename: 'property5.jpg', text: 'Tournament Hills Home' },
  { filename: 'property6.jpg', text: 'Desert Foothills Property' },
  { filename: 'tournament-hills.jpg', text: 'Tournament Hills Community' }
];

properties.forEach(prop => {
  createPlaceholderImage(prop.filename, prop.text);
});

console.log('All property placeholders created!');
