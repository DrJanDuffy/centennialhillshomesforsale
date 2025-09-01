#!/usr/bin/env node

/**
 * Generate Hero Image using ChatGPT (GPT-4o) via OpenRouter
 * This script will attempt to generate a luxury real estate hero image
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
  console.log('❌ OPENROUTER_API_KEY not found in .env.local');
  process.exit(1);
}

async function generateHeroImage() {
  console.log('🎨 Generating luxury hero image with ChatGPT (GPT-5) via OpenRouter...\n');

  // Use the enhanced prompt we generated earlier
  const prompt = `Ultra-photorealistic, 8K architectural photograph of an ultra-modern luxury home in Centennial Hills, Las Vegas, Nevada. The house features clean lines, flat roofs, expansive floor-to-ceiling glass windows, and a minimalist design using warm gray concrete, dark wood accents, and light natural stone. An infinity-edge pool with dark tiling perfectly reflects the golden hour sky and the majestic Spring Mountains in the background. Strategically placed warm LED lighting subtly illuminates the exterior and interior, creating an inviting glow. An elegant outdoor living area with a modern fire pit and low-slung furniture is visible on a large paver patio. The surrounding landscape consists of artfully arranged, drought-tolerant desert plants like agaves and yucca, integrated into the natural reddish-brown desert terrain. The Spring Mountains are prominent in the distant background, illuminated by the setting sun, showcasing their rugged textures against a gradient sky of soft oranges, pinks, and blues. Cinematic lighting, razor-sharp focus, epic scale, tranquil, luxurious, aspirational, no people, no vehicles, award-winning photograph, masterpiece.`;

  try {
    console.log('🚀 Sending request to OpenRouter with GPT-5...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://centennialhillshomesforsale.com',
        'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-5',
        messages: [
          {
            role: 'user',
            content: `Generate a high-quality real estate hero image with this detailed description: ${prompt}. Please provide the image as a base64 encoded string or direct URL.`
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:', response.status, response.statusText);
      console.log('Error details:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Response received from GPT-5!');
    console.log('📝 Response preview:', JSON.stringify(data, null, 2).substring(0, 500) + '...');

    // Check if we got an image URL or base64 data
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const messageContent = data.choices[0].message.content;
      console.log('📄 Message content type:', typeof messageContent);
      
      if (typeof messageContent === 'string') {
        // Try to extract image URL or base64 from the response
        const urlMatch = messageContent.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp)/i);
        const base64Match = messageContent.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
        
        if (urlMatch) {
          const imageUrl = urlMatch[0];
          console.log('🖼️  Found image URL:', imageUrl);
          await downloadAndSaveImage(imageUrl);
        } else if (base64Match) {
          const base64Data = base64Match[1];
          console.log('🖼️  Found base64 image data');
          await saveBase64Image(base64Data);
        } else {
          console.log('⚠️  No image found in response. GPT-5 may not support direct image generation through OpenRouter.');
          console.log('📝 Full response:', messageContent);
          console.log('\n🔄 Trying alternative approach...');
          await tryAlternativeGeneration();
        }
      } else {
        console.log('⚠️  Unexpected response format');
        console.log('📝 Full response:', JSON.stringify(data, null, 2));
      }
    } else {
      console.log('❌ No valid response structure found');
      console.log('📝 Full response:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    
    if (error.message.includes('API request failed')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check your OpenRouter API key in .env.local');
      console.log('2. Ensure you have credits in your OpenRouter account');
      console.log('3. Try again in a few minutes if rate limited');
      console.log('4. Get your API key from: https://openrouter.ai/keys');
    }
  }
}

async function downloadAndSaveImage(imageUrl) {
  try {
    console.log('📥 Downloading image from URL...');
    
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to download image from URL');
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    await saveImageBuffer(imageBuffer);
    
  } catch (error) {
    console.error('❌ Error downloading image:', error.message);
  }
}

async function saveBase64Image(base64Data) {
  try {
    console.log('💾 Saving base64 image...');
    
    const imageBuffer = Buffer.from(base64Data, 'base64');
    await saveImageBuffer(imageBuffer);
    
  } catch (error) {
    console.error('❌ Error saving base64 image:', error.message);
  }
}

async function saveImageBuffer(imageBuffer) {
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
}

async function tryAlternativeGeneration() {
  console.log('🔄 Attempting alternative generation method...');
  
  try {
    // Try a different approach - ask GPT-4o to create a DALL-E prompt
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://centennialhillshomesforsale.com',
        'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-5',
        messages: [
          {
            role: 'user',
            content: `I need you to help me create a detailed prompt for generating a luxury real estate hero image using DALL-E 3. Please provide a very detailed, specific prompt that I can use with DALL-E 3. The image should be of a modern luxury home in Centennial Hills, Las Vegas with Spring Mountains backdrop. Make the prompt extremely detailed and specific for best results with DALL-E 3.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const enhancedPrompt = data.choices[0].message.content;
        console.log('✨ Enhanced DALL-E 3 prompt generated by GPT-5:');
        console.log('📝', enhancedPrompt);
        
        // Save the enhanced prompt to a file
        fs.writeFileSync('dalle3-hero-prompt.txt', enhancedPrompt);
        console.log('💾 Enhanced DALL-E 3 prompt saved to: dalle3-hero-prompt.txt');
        console.log('\n🎯 Use this enhanced prompt with:');
        console.log('• DALL-E 3: https://chat.openai.com/');
        console.log('• DALL-E 3 API: https://platform.openai.com/docs/guides/images');
        console.log('• Midjourney: https://midjourney.com/');
        console.log('• Adobe Firefly: https://firefly.adobe.com/');
      }
    }
  } catch (error) {
    console.error('❌ Alternative generation failed:', error.message);
  }
}

// Run the image generation
generateHeroImage();
