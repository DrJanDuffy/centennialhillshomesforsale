const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        const filePath = path.join(__dirname, '../public/images', filename);
        const fileStream = fs.createWriteStream(filePath);

        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(filePath, () => reject(err));
        });
      })
      .on('error', reject);
  });
};

const images = [
  {
    url: 'https://randomuser.me/api/portraits/women/76.jpg',
    filename: 'agent1.jpg',
  },
  {
    url: 'https://randomuser.me/api/portraits/men/32.jpg',
    filename: 'agent2.jpg',
  },
  {
    url: 'https://randomuser.me/api/portraits/women/45.jpg',
    filename: 'agent3.jpg',
  },
];

async function downloadAllImages() {
  try {
    await Promise.all(images.map((img) => downloadImage(img.url, img.filename)));
    console.log('All images downloaded successfully');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages();
