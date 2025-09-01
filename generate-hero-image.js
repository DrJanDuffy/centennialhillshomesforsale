#!/usr/bin/env node

/**
 * Hero Image Generation Helper
 * This script provides prompts and instructions for generating AI hero images
 */

const prompts = {
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

const aiTools = [
  {
    name: 'DALL-E 3 (ChatGPT Plus)',
    url: 'https://chat.openai.com/',
    instructions:
      '1. Go to ChatGPT Plus\n2. Select DALL-E 3\n3. Paste the prompt\n4. Generate image\n5. Download high-res version',
  },
  {
    name: 'Midjourney',
    url: 'https://midjourney.com/',
    instructions:
      '1. Join Midjourney Discord\n2. Use /imagine command\n3. Paste the prompt\n4. Upscale best result\n5. Download image',
  },
  {
    name: 'Adobe Firefly',
    url: 'https://firefly.adobe.com/',
    instructions:
      "1. Go to Adobe Firefly\n2. Select 'Text to Image'\n3. Paste the prompt\n4. Generate image\n5. Download commercial use version",
  },
  {
    name: 'Stable Diffusion (Free)',
    url: 'https://huggingface.co/spaces/stabilityai/stable-diffusion',
    instructions:
      '1. Go to Hugging Face Stable Diffusion\n2. Enter the prompt\n3. Adjust settings\n4. Generate image\n5. Download result',
  },
];

function displayPrompt(type) {
  console.log(`\n🎨 ${type.toUpperCase()} HERO IMAGE PROMPT:\n`);
  console.log(prompts[type]);
  console.log('\n' + '='.repeat(80) + '\n');
}

function displayAITools() {
  console.log('\n🤖 AI IMAGE GENERATION TOOLS:\n');
  aiTools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
    console.log(`   URL: ${tool.url}`);
    console.log(`   Instructions: ${tool.instructions}\n`);
  });
}

function displayInstructions() {
  console.log('\n📋 GENERATION INSTRUCTIONS:\n');
  console.log('1. Choose a prompt type (primary, aerial, interior, lifestyle)');
  console.log('2. Select an AI tool from the list above');
  console.log('3. Copy the prompt and paste it into the AI tool');
  console.log('4. Generate multiple variations');
  console.log('5. Select the best result');
  console.log('6. Download as high-resolution image');
  console.log('7. Save to /public/images/hero-image.jpg');
  console.log('8. Update your hero component to use the new image\n');
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'primary':
    displayPrompt('primary');
    break;
  case 'aerial':
    displayPrompt('aerial');
    break;
  case 'interior':
    displayPrompt('interior');
    break;
  case 'lifestyle':
    displayPrompt('lifestyle');
    break;
  case 'tools':
    displayAITools();
    break;
  case 'help':
  default:
    console.log('\n🏠 CENTENNIAL HILLS HERO IMAGE GENERATOR\n');
    console.log('Usage: node generate-hero-image.js [command]\n');
    console.log('Commands:');
    console.log('  primary   - Show primary hero image prompt');
    console.log('  aerial    - Show aerial view prompt');
    console.log('  interior  - Show interior focus prompt');
    console.log('  lifestyle - Show lifestyle focus prompt');
    console.log('  tools     - Show AI tools and instructions');
    console.log('  help      - Show this help message\n');
    displayInstructions();
    break;
}

console.log(
  '\n✨ Happy generating! Your new hero image will make your real estate website shine! ✨\n'
);

