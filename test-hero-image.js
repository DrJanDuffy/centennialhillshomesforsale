#!/usr/bin/env node

/**
 * Hero Image Test Script
 * Tests if the hero image exists and provides integration instructions
 */

const fs = require('node:fs');
const _path = require('node:path');

function testHeroImage() {
  const heroImagePath = 'public/images/hero-image.jpg';

  console.log('🏠 HERO IMAGE INTEGRATION TEST\n');

  // Check if hero image exists
  if (fs.existsSync(heroImagePath)) {
    const stats = fs.statSync(heroImagePath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log('✅ Hero image found!');
    console.log(`📁 Location: ${heroImagePath}`);
    console.log(`📏 File size: ${fileSizeKB} KB`);
    console.log(`📅 Last modified: ${stats.mtime.toLocaleString()}`);

    if (fileSizeKB > 1000) {
      console.log('⚠️  Large file size detected. Consider optimizing for web use.');
    }

    console.log('\n🎉 Your hero image is ready!');
    console.log('🌐 Test your hero section at: http://localhost:3000/luxury-hero-test');
  } else {
    console.log('❌ Hero image not found');
    console.log(`📁 Expected location: ${heroImagePath}`);
    console.log('\n📋 To add your hero image:');
    console.log('1. Generate your image using DALL-E 3 with the prompt from HERO-IMAGE-GUIDE.md');
    console.log('2. Save the image as "hero-image.jpg"');
    console.log('3. Place it in the public/images/ directory');
    console.log('4. Run this test again to verify');
  }

  // Check if images directory exists
  const imagesDir = 'public/images';
  if (!fs.existsSync(imagesDir)) {
    console.log('\n📁 Creating images directory...');
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('✅ Created public/images directory');
  }

  console.log('\n🔧 Integration Options:');
  console.log('1. Use the LuxuryHeroSection component in your pages');
  console.log('2. Test at: http://localhost:3000/luxury-hero-test');
  console.log('3. View standalone HTML: public/hero-preview.html');
  console.log('\n✨ Your luxury real estate hero section is ready to impress! ✨');
}

// Run the test
testHeroImage();
