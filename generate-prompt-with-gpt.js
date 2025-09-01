#!/usr/bin/env node

/**
 * Generate Enhanced Prompt using GPT-4o via OpenRouter
 * This script will create an optimized prompt for image generation tools
 */

const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
  console.log('❌ OPENROUTER_API_KEY not found in .env.local');
  process.exit(1);
}

async function generateEnhancedPrompt() {
  console.log('🎨 Generating enhanced prompt with GPT-4o...\n');

  const basePrompt = `A luxury modern home in Centennial Hills, Las Vegas with Spring Mountains backdrop. Contemporary architecture with glass windows, stone accents, desert landscape with Joshua trees and cacti. Golden hour lighting, professional real estate photography style, 16:9 aspect ratio, high resolution, aspirational aesthetic.`;

  try {
    console.log('🚀 Sending request to OpenRouter with GPT-4o...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://centennialhillshomesforsale.com',
        'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'user',
            content: `I need you to create an extremely detailed and optimized prompt for generating a luxury real estate hero image. Please enhance this base prompt and make it perfect for DALL-E 3, Midjourney, or other AI image generation tools:

Base prompt: "${basePrompt}"

Please create:
1. A DALL-E 3 optimized prompt (detailed, specific, professional)
2. A Midjourney optimized prompt (with proper parameters and style)
3. A general AI art prompt (for Stable Diffusion, Adobe Firefly, etc.)

Make each prompt extremely detailed, specific, and optimized for the best possible results. Include technical photography terms, lighting details, composition elements, and style specifications.`
          }
        ],
        max_tokens: 3000,
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
    console.log('✅ Enhanced prompts generated successfully!');

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const enhancedPrompts = data.choices[0].message.content;
      console.log('📝 Enhanced prompts:');
      console.log(enhancedPrompts);
      
      // Save the enhanced prompts to a file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `enhanced-hero-prompts-${timestamp}.txt`;
      fs.writeFileSync(filename, enhancedPrompts);
      console.log(`\n💾 Enhanced prompts saved to: ${filename}`);
      
      // Also save to a standard filename for easy access
      fs.writeFileSync('enhanced-hero-prompts.txt', enhancedPrompts);
      console.log('💾 Also saved to: enhanced-hero-prompts.txt');
      
      console.log('\n🎯 Use these enhanced prompts with:');
      console.log('• DALL-E 3: https://chat.openai.com/');
      console.log('• Midjourney: https://midjourney.com/');
      console.log('• Adobe Firefly: https://firefly.adobe.com/');
      console.log('• Stable Diffusion: https://huggingface.co/spaces/stabilityai/stable-diffusion');
      console.log('• Leonardo AI: https://leonardo.ai/');
      console.log('• Runway ML: https://runwayml.com/');
      
      console.log('\n✨ Your enhanced prompts are ready for use!');
      
    } else {
      console.log('❌ No valid response structure found');
      console.log('📝 Full response:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('❌ Error generating enhanced prompts:', error.message);
    
    if (error.message.includes('API request failed')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check your OpenRouter API key in .env.local');
      console.log('2. Ensure you have credits in your OpenRouter account');
      console.log('3. Try again in a few minutes if rate limited');
      console.log('4. Get your API key from: https://openrouter.ai/keys');
    }
  }
}

// Run the enhanced prompt generation
generateEnhancedPrompt();
