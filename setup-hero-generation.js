#!/usr/bin/env node

/**
 * Setup Script for Hero Image Generation
 * This script will help you set up the environment for generating your hero image
 */

const fs = require('fs');
const path = require('path');

function setupHeroGeneration() {
  console.log('🎨 HERO IMAGE GENERATION SETUP\n');
  
  const envLocalPath = '.env.local';
  
  // Check if .env.local exists
  if (fs.existsSync(envLocalPath)) {
    console.log('✅ .env.local file found');
    const content = fs.readFileSync(envLocalPath, 'utf8');
    
    if (content.includes('OPENAI_API_KEY')) {
      console.log('✅ OpenAI API key configuration found');
    } else {
      console.log('⚠️  OpenAI API key not found in .env.local');
    }
  } else {
    console.log('❌ .env.local file not found');
    console.log('📁 Creating .env.local template...');
    
    const envTemplate = `# OpenAI API Key for DALL-E 3 Image Generation
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your-openai-api-key-here

# OpenRouter API Key (if you want to use OpenRouter)
# Get your API key from: https://openrouter.ai/keys
OPENROUTER_API_KEY=your-openrouter-api-key-here
`;
    
    fs.writeFileSync(envLocalPath, envTemplate);
    console.log('✅ Created .env.local template');
  }
  
  console.log('\n🔧 SETUP INSTRUCTIONS:');
  console.log('1. Get your OpenAI API key from: https://platform.openai.com/api-keys');
  console.log('2. Edit .env.local and replace "your-openai-api-key-here" with your actual key');
  console.log('3. Run: node generate-hero-dalle3.js');
  console.log('4. Test: node test-hero-image.js');
  
  console.log('\n🎯 ALTERNATIVE METHODS:');
  console.log('• ChatGPT Plus: https://chat.openai.com/ (use DALL-E 3)');
  console.log('• Midjourney: https://midjourney.com/');
  console.log('• Adobe Firefly: https://firefly.adobe.com/');
  console.log('• Stable Diffusion: https://huggingface.co/spaces/stabilityai/stable-diffusion');
  
  console.log('\n📋 PROMPT TO USE:');
  console.log('Create a breathtaking, high-end real estate hero image featuring a sleek, modern luxury home in Centennial Hills, Las Vegas, with a majestic mountainous backdrop of the Spring Mountains and Red Rock Canyon. The scene should showcase a stunning example of luxury living, with clean, minimalist architectural lines, accented by rich, natural stone finishes and gleaming glass, metal, and wood elements. A sprawling desert landscape with a mix of Joshua trees, cacti, and carefully curated desert shrubs, showcasing the property\'s seamless integration with its natural surroundings. Soothing, warm golden hour lighting, with long shadows cast across the property, emphasizing the textures and lines of the modern design. A dramatic, partly cloudy blue sky with hints of warm golden tones, setting the tone for an aspirational, high-end lifestyle. Perfect, precision-crafted landscaping, featuring a curated selection of drought-resistant, desert-friendly plants, adding pops of color and texture to the scene. A wide-angle composition, showcasing the full property, with a seamless blend of indoors and outdoors, highlighting the seamless flow of living spaces. A warm, inviting color palette with a balance of soothing blues, rich golds, and earthy tones, evoking a sense of serenity and luxury. A high-resolution image with a 16:9 aspect ratio, perfect for social media, advertising, and marketing materials. A professional, aspirational aesthetic, capturing the essence of luxury living in the Nevada desert, with a sense of exclusivity and sophistication.');
  
  console.log('\n✨ Once you have your hero image, save it as: public/images/hero-image.jpg');
  console.log('🌐 Then test at: http://localhost:3000/luxury-hero-test');
}

// Run the setup
setupHeroGeneration();
