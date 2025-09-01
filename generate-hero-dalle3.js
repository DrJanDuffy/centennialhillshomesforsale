#!/usr/bin/env node

/**
 * Generate Hero Image using DALL-E 3 via OpenAI API
 * This script will generate a luxury real estate hero image using DALL-E 3
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
  console.log('❌ OPENAI_API_KEY not found in .env.local');
  console.log('📋 Please add your OpenAI API key to .env.local:');
  console.log('   OPENAI_API_KEY=your-actual-openai-api-key');
  console.log('\n🔗 Get your API key from: https://platform.openai.com/api-keys');
  process.exit(1);
}

async function generateHeroImage() {
  console.log('🎨 Generating luxury hero image with DALL-E 3...\n');

  const prompt = `Create a breathtaking, high-end real estate hero image featuring a sleek, modern luxury home in Centennial Hills, Las Vegas, with a majestic mountainous backdrop of the Spring Mountains and Red Rock Canyon. The scene should showcase a stunning example of luxury living, with:

- Clean, minimalist architectural lines, accented by rich, natural stone finishes and gleaming glass, metal, and wood elements
- A sprawling desert landscape with a mix of Joshua trees, cacti, and carefully curated desert shrubs, showcasing the property's seamless integration with its natural surroundings
- Soothing, warm golden hour lighting, with long shadows cast across the property, emphasizing the textures and lines of the modern design
- A dramatic, partly cloudy blue sky with hints of warm golden tones, setting the tone for an aspirational, high-end lifestyle
- Perfect, precision-crafted landscaping, featuring a curated selection of drought-resistant, desert-friendly plants, adding pops of color and texture to the scene
- A wide-angle composition, showcasing the full property, with a seamless blend of indoors and outdoors, highlighting the seamless flow of living spaces
- A warm, inviting color palette with a balance of soothing blues, rich golds, and earthy tones, evoking a sense of serenity and luxury
- A high-resolution image with a 16:9 aspect ratio, perfect for social media, advertising, and marketing materials
- A professional, aspirational aesthetic, capturing the essence of luxury living in the Nevada desert, with a sense of exclusivity and sophistication.`;

  try {
    console.log('🚀 Sending request to OpenAI DALL-E 3...');
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
        style: 'natural'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:', response.status, response.statusText);
      console.log('Error details:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Image generated successfully!');

    if (data.data && data.data[0] && data.data[0].url) {
      const imageUrl = data.data[0].url;
      console.log('📥 Downloading image...');
      
      // Download the image
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error('Failed to download image');
      }
      
      const imageBuffer = await imageResponse.arrayBuffer();
      
      // Ensure images directory exists
      const imagesDir = 'public/images';
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
        console.log('📁 Created public/images directory');
      }
      
      // Save the image
      const imagePath = path.join(imagesDir, 'hero-image.jpg');
      fs.writeFileSync(imagePath, Buffer.from(imageBuffer));
      
      const stats = fs.statSync(imagePath);
      const fileSizeKB = Math.round(stats.size / 1024);
      
      console.log('🎉 Hero image saved successfully!');
      console.log(`📁 Location: ${imagePath}`);
      console.log(`📏 File size: ${fileSizeKB} KB`);
      console.log(`📅 Generated: ${new Date().toLocaleString()}`);
      
      if (fileSizeKB > 1000) {
        console.log('⚠️  Large file size detected. Consider optimizing for web use.');
      }
      
      console.log('\n🌐 Test your hero section at: http://localhost:3000/luxury-hero-test');
      console.log('✨ Your luxury real estate hero section is ready! ✨');
      
    } else {
      console.log('❌ No image URL found in response');
      console.log('Response data:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    
    if (error.message.includes('API request failed')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check your OpenAI API key in .env.local');
      console.log('2. Ensure you have credits in your OpenAI account');
      console.log('3. Try again in a few minutes if rate limited');
      console.log('4. Get your API key from: https://platform.openai.com/api-keys');
    }
  }
}

// Run the image generation
generateHeroImage();
