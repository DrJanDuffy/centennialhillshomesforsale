#!/usr/bin/env node

/**
 * Hero Image Prompt Generator
 * Generates optimized prompts for AI image generation tools
 */

const https = require('node:https');
const fs = require('node:fs');
const _path = require('node:path');

// Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'your-api-key-here';

// Base prompts for different hero image types
const basePrompts = {
  primary: `Create a stunning, professional real estate hero image featuring a luxury home in Centennial Hills, Las Vegas. The image should show:

- A beautiful modern luxury home with clean architectural lines
- Mountain views in the background (Spring Mountains/Red Rock Canyon)
- Desert landscape with native plants (Joshua trees, cacti, desert shrubs)
- Warm, golden hour lighting with dramatic shadows
- Professional real estate photography style
- High-end finishes visible (stone, glass, modern materials)
- Perfect landscaping with desert-appropriate plants
- Blue sky with some dramatic clouds
- Wide angle shot showing the full property
- Warm color palette with blues, golds, and earth tones
- 16:9 aspect ratio, high resolution
- Professional, aspirational, luxury real estate aesthetic`,

  aerial: `Aerial drone shot of luxury homes in Centennial Hills, Las Vegas, showing:
- Master-planned community layout
- Mountain backdrop (Spring Mountains)
- Desert landscape
- Modern homes with pools and landscaping
- Golden hour lighting
- Professional real estate photography
- 16:9 aspect ratio, high resolution`,

  interior: `Luxury home interior in Centennial Hills, Las Vegas, featuring:
- Open concept living space with floor-to-ceiling windows
- Mountain views through large windows
- Modern kitchen with premium finishes
- Warm, natural lighting
- Desert-inspired color palette
- High-end furniture and decor
- Professional interior photography
- 16:9 aspect ratio, high resolution`,

  lifestyle: `Luxury lifestyle in Centennial Hills, Las Vegas, showing:
- Family enjoying outdoor living space
- Pool and outdoor kitchen area
- Mountain views in background
- Desert landscaping
- Warm, inviting atmosphere
- Professional lifestyle photography
- 16:9 aspect ratio, high resolution`,
};

function makeApiRequest(endpoint, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: `/api/v1${endpoint}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://centennialhillshomesforsale.com',
        'X-Title': 'Centennial Hills Real Estate',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve(parsed);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function enhancePrompt(basePrompt, type) {
  console.log(`🤖 Enhancing ${type} prompt with AI...`);

  const enhancementRequest = {
    model: 'meta-llama/llama-3.1-8b-instruct',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert AI prompt engineer specializing in real estate photography. Your task is to enhance image generation prompts to be more specific, detailed, and effective for creating stunning real estate hero images.',
      },
      {
        role: 'user',
        content: `Please enhance this real estate image prompt to be more detailed and effective for AI image generation. Make it more specific about lighting, composition, and visual elements while keeping it focused on luxury real estate in Centennial Hills, Las Vegas:

${basePrompt}

Return only the enhanced prompt, no additional text.`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  };

  try {
    const response = await makeApiRequest('/chat/completions', enhancementRequest);

    if (response.choices?.[0]?.message) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('❌ Error enhancing prompt:', error.message);
    console.log('📝 Using original prompt instead...');
    return basePrompt;
  }
}

async function generateOptimizedPrompts(type = 'primary') {
  if (!basePrompts[type]) {
    throw new Error(
      `Invalid prompt type: ${type}. Available types: ${Object.keys(basePrompts).join(', ')}`
    );
  }

  if (OPENROUTER_API_KEY === 'your-api-key-here') {
    console.log('❌ Please set your OPENROUTER_API_KEY environment variable');
    console.log('   Example: export OPENROUTER_API_KEY="your-actual-api-key"');
    return;
  }

  const basePrompt = basePrompts[type];
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `hero-prompts-${type}-${timestamp}.txt`;

  try {
    console.log(`🚀 Generating optimized prompts for ${type} hero image...`);

    // Enhance the base prompt
    const enhancedPrompt = await enhancePrompt(basePrompt, type);

    // Create variations for different AI tools
    const variations = {
      'DALL-E 3': enhancedPrompt,
      Midjourney: enhancedPrompt.replace(
        /16:9 aspect ratio, high resolution/g,
        '--ar 16:9 --v 6 --style raw'
      ),
      'Stable Diffusion': enhancedPrompt.replace(
        /16:9 aspect ratio, high resolution/g,
        'masterpiece, best quality, 8k, photorealistic, 16:9'
      ),
      'Adobe Firefly': enhancedPrompt.replace(
        /16:9 aspect ratio, high resolution/g,
        'high resolution, professional photography'
      ),
    };

    // Save to file
    let content = `# Optimized Hero Image Prompts for ${type.toUpperCase()}\n`;
    content += `# Generated: ${new Date().toISOString()}\n\n`;

    Object.entries(variations).forEach(([tool, prompt]) => {
      content += `## ${tool}\n\n${prompt}\n\n---\n\n`;
    });

    fs.writeFileSync(filename, content);

    console.log(`\n🎉 Optimized prompts generated successfully!`);
    console.log(`📁 File saved: ${filename}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Open ${filename} to see the optimized prompts`);
    console.log(`   2. Copy the prompt for your preferred AI tool`);
    console.log(`   3. Generate your hero image`);
    console.log(`   4. Save as public/images/hero-image.jpg`);

    // Display the enhanced prompt
    console.log(`\n🎨 ENHANCED PROMPT FOR ${type.toUpperCase()}:\n`);
    console.log(enhancedPrompt);
    console.log(`\n${'='.repeat(80)}\n`);

    return filename;
  } catch (error) {
    console.error('❌ Failed to generate optimized prompts:', error.message);
    throw error;
  }
}

function displayUsage() {
  console.log('\n🏠 HERO IMAGE PROMPT GENERATOR\n');
  console.log('Usage: node generate-hero-prompts.js [type]\n');
  console.log('Types:');
  Object.keys(basePrompts).forEach((type) => {
    console.log(`  ${type.padEnd(10)} - ${type} hero image prompts`);
  });
  console.log('\nExamples:');
  console.log('  node generate-hero-prompts.js primary');
  console.log('  node generate-hero-prompts.js aerial');
  console.log('  node generate-hero-prompts.js interior');
  console.log('  node generate-hero-prompts.js lifestyle');
  console.log('\nEnvironment Setup:');
  console.log('  export OPENROUTER_API_KEY="your-api-key-here"');
  console.log('\n✨ Generate optimized prompts for stunning hero images! ✨\n');
}

// Main execution
const args = process.argv.slice(2);
const type = args[0] || 'primary';

if (args.includes('--help') || args.includes('-h')) {
  displayUsage();
} else {
  generateOptimizedPrompts(type).catch((error) => {
    console.error('❌ Generation failed:', error.message);
    process.exit(1);
  });
}
