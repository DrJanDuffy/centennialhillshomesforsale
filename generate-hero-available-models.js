#!/usr/bin/env node

/**
 * Generate Hero Image using Available Models via OpenRouter
 * This script uses only models that work with Zero data retention policy
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
  console.log('🎨 Generating luxury hero image using available models...\n');

  // Use the enhanced prompt we generated earlier
  const prompt = `Ultra-photorealistic, 8K architectural photograph of an ultra-modern luxury home in Centennial Hills, Las Vegas, Nevada. The house features clean lines, flat roofs, expansive floor-to-ceiling glass windows, and a minimalist design using warm gray concrete, dark wood accents, and light natural stone. An infinity-edge pool with dark tiling perfectly reflects the golden hour sky and the majestic Spring Mountains in the background. Strategically placed warm LED lighting subtly illuminates the exterior and interior, creating an inviting glow. An elegant outdoor living area with a modern fire pit and low-slung furniture is visible on a large paver patio. The surrounding landscape consists of artfully arranged, drought-tolerant desert plants like agaves and yucca, integrated into the natural reddish-brown desert terrain. The Spring Mountains are prominent in the distant background, illuminated by the setting sun, showcasing their rugged textures against a gradient sky of soft oranges, pinks, and blues. Cinematic lighting, razor-sharp focus, epic scale, tranquil, luxurious, aspirational, no people, no vehicles, award-winning photograph, masterpiece.`;

  // Try available models in order of preference
  const availableModels = [
    'google/gemini-2.5-flash',
    'anthropic/claude-3-5-sonnet'
  ];

  for (const model of availableModels) {
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
              content: `I need you to help me create a detailed prompt for generating a luxury real estate hero image. Please provide a very detailed, specific prompt that I can use with DALL-E 3, Midjourney, or other image generation tools. The image should be of a modern luxury home in Centennial Hills, Las Vegas with Spring Mountains backdrop. Make the prompt extremely detailed and specific for best results. Include specific technical details, lighting, composition, and style instructions.`
            }
          ],
          max_tokens: 2000,
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
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const enhancedPrompt = data.choices[0].message.content;
        console.log('✨ Enhanced prompt generated:');
        console.log('📝', enhancedPrompt);
        
        // Save the enhanced prompt to a file
        const filename = `enhanced-hero-prompt-${model.replace('/', '-')}.txt`;
        fs.writeFileSync(filename, enhancedPrompt);
        console.log(`💾 Enhanced prompt saved to: ${filename}`);
        
        console.log('\n🎯 Use this enhanced prompt with:');
        console.log('• DALL-E 3: https://chat.openai.com/');
        console.log('• Midjourney: https://midjourney.com/');
        console.log('• Adobe Firefly: https://firefly.adobe.com/');
        console.log('• Stable Diffusion: https://huggingface.co/spaces/stabilityai/stable-diffusion');
        console.log('• Leonardo AI: https://leonardo.ai/');
        console.log('• Runway ML: https://runwayml.com/');
        
        // Also save a ready-to-use version
        const readyPrompt = `"${enhancedPrompt}"`;
        fs.writeFileSync('ready-to-use-prompt.txt', readyPrompt);
        console.log('💾 Ready-to-use prompt saved to: ready-to-use-prompt.txt');
        
        console.log('\n🎉 Success! You now have an enhanced prompt ready for AI image generation!');
        return; // Success, exit the function
      }
      
    } catch (error) {
      console.error(`❌ Error with ${model}:`, error.message);
      continue; // Try next model
    }
  }
  
  console.log('❌ All available models failed. Please check your OpenRouter settings.');
}

// Run the image generation
generateHeroImage();
