#!/usr/bin/env node

/**
 * Generate Hero Image using Perplexity via OpenRouter
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
  console.log('🎨 Generating luxury hero image with Google Gemini 2.5 Flash Image Preview via OpenRouter...\n');

  // Use the enhanced prompt we generated earlier
  const prompt = `Ultra-photorealistic, 8K architectural photograph of an ultra-modern luxury home in Centennial Hills, Las Vegas, Nevada. The house features clean lines, flat roofs, expansive floor-to-ceiling glass windows, and a minimalist design using warm gray concrete, dark wood accents, and light natural stone. An infinity-edge pool with dark tiling perfectly reflects the golden hour sky and the majestic Spring Mountains in the background. Strategically placed warm LED lighting subtly illuminates the exterior and interior, creating an inviting glow. An elegant outdoor living area with a modern fire pit and low-slung furniture is visible on a large paver patio. The surrounding landscape consists of artfully arranged, drought-tolerant desert plants like agaves and yucca, integrated into the natural reddish-brown desert terrain. The Spring Mountains are prominent in the distant background, illuminated by the setting sun, showcasing their rugged textures against a gradient sky of soft oranges, pinks, and blues. Cinematic lighting, razor-sharp focus, epic scale, tranquil, luxurious, aspirational, no people, no vehicles, award-winning photograph, masterpiece.`;

  // Try Google Gemini 2.5 Flash Image Preview models
  const imageModels = [
    'google/gemini-2.5-flash-image-preview',
    'google/gemini-2.5-flash-image-preview:free'
  ];

  for (const model of imageModels) {
    console.log(`🚀 Trying ${model}...`);
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://centennialhillshomesforsale.com',
          'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Generate a high-quality real estate hero image with this detailed description: ${prompt}. Please provide the image as a base64 encoded string or direct URL.`
                }
              ]
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`❌ ${model} failed:`, response.status, response.statusText);
        console.log('Error details:', errorText);
        continue; // Try next model
      }

      const data = await response.json();
      console.log(`✅ Response received from ${model}!`);
      console.log('📝 Response preview:', JSON.stringify(data, null, 2).substring(0, 500) + '...');

      // Check if we got an image URL or base64 data
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const message = data.choices[0].message;
        console.log('📄 Message structure:', JSON.stringify(message, null, 2));
        
        // Check for images array in the message
        if (message.images && message.images.length > 0) {
          console.log('🖼️  Found images array with', message.images.length, 'image(s)');
          
          for (const image of message.images) {
            if (image.type === 'image_url' && image.image_url) {
              const imageUrl = image.image_url.url || image.image_url;
              console.log('🖼️  Found image URL:', imageUrl);
              await downloadAndSaveImage(imageUrl);
              return; // Success, exit the function
            }
          }
        }
        
        // Fallback: check message content for URLs
        const messageContent = message.content;
        if (typeof messageContent === 'string') {
          // Try to extract image URL or base64 from the response
          const urlMatch = messageContent.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp)/i);
          const base64Match = messageContent.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
          
          if (urlMatch) {
            const imageUrl = urlMatch[0];
            console.log('🖼️  Found image URL in content:', imageUrl);
            await downloadAndSaveImage(imageUrl);
            return; // Success, exit the function
          } else if (base64Match) {
            const base64Data = base64Match[1];
            console.log('🖼️  Found base64 image data in content');
            await saveBase64Image(base64Data);
            return; // Success, exit the function
          }
        }
        
        console.log('⚠️  No image found in response. Trying alternative approach...');
        await tryAlternativeGeneration(model);
        return; // Try alternative, then exit
        
      } else {
        console.log('❌ No valid response structure found');
        console.log('📝 Full response:', JSON.stringify(data, null, 2));
      }
      
    } catch (error) {
      console.error(`❌ Error with ${model}:`, error.message);
      continue; // Try next model
    }
  }
  
  console.log('❌ All Gemini Image Preview models failed. Please check your OpenRouter settings.');
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

async function tryAlternativeGeneration(model) {
  console.log('🔄 Attempting alternative generation method...');
  
  try {
    // Try a different approach - ask Perplexity to create an enhanced prompt
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://centennialhillshomesforsale.com',
        'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: `I need you to help me create a detailed prompt for generating a luxury real estate hero image using DALL-E 3, Midjourney, or other AI image generation tools. The image should be of a modern luxury home in Centennial Hills, Las Vegas with Spring Mountains backdrop. Make the prompt extremely detailed and specific for best results. Include specific technical details, lighting, composition, and style instructions.`
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
        console.log('✨ Enhanced prompt generated by Gemini Image Preview:');
        console.log('📝', enhancedPrompt);
        
        // Save the enhanced prompt to a file
        const filename = `gemini-image-preview-hero-prompt-${model.replace('/', '-')}.txt`;
        fs.writeFileSync(filename, enhancedPrompt);
        console.log(`💾 Enhanced prompt saved to: ${filename}`);
        
        console.log('\n🎯 Use this enhanced prompt with:');
        console.log('• DALL-E 3: https://chat.openai.com/');
        console.log('• Midjourney: https://midjourney.com/');
        console.log('• Adobe Firefly: https://firefly.adobe.com/');
        console.log('• Stable Diffusion: https://huggingface.co/spaces/stabilityai/stable-diffusion');
        console.log('• Leonardo AI: https://leonardo.ai/');
        console.log('• Runway ML: https://runwayml.com/');
      }
    }
  } catch (error) {
    console.error('❌ Alternative generation failed:', error.message);
  }
}

// Run the image generation
generateHeroImage();
