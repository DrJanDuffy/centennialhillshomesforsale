#!/usr/bin/env node

/**
 * Check Available Models through OpenRouter
 * This script will list all available models for your account
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
  console.log('❌ OPENROUTER_API_KEY not found in .env.local');
  process.exit(1);
}

async function checkAvailableModels() {
  console.log('🔍 Checking available models through OpenRouter...\n');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:', response.status, response.statusText);
      console.log('Error details:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('📋 Available models:');
    const geminiModels = data.data.filter(model => 
      model.id.toLowerCase().includes('gemini') || 
      model.id.toLowerCase().includes('google')
    );
    
    if (geminiModels.length > 0) {
      console.log('\n🎯 Gemini/Google models found:');
      geminiModels.forEach(model => {
        console.log(`• ${model.id} - ${model.name || 'No description'}`);
      });
    } else {
      console.log('\n❌ No Gemini models found');
    }

    // Also check for image generation models
    const imageModels = data.data.filter(model => 
      model.id.toLowerCase().includes('image') || 
      model.id.toLowerCase().includes('dall') ||
      model.id.toLowerCase().includes('midjourney') ||
      model.id.toLowerCase().includes('stable')
    );
    
    if (imageModels.length > 0) {
      console.log('\n🎨 Image generation models found:');
      imageModels.forEach(model => {
        console.log(`• ${model.id} - ${model.name || 'No description'}`);
      });
    } else {
      console.log('\n❌ No image generation models found');
    }

    // Show some general models that might work
    console.log('\n📋 Some general models that might work:');
    const generalModels = data.data.filter(model => 
      model.id.includes('gpt') || 
      model.id.includes('claude') ||
      model.id.includes('llama')
    ).slice(0, 10);
    
    generalModels.forEach(model => {
      console.log(`• ${model.id} - ${model.name || 'No description'}`);
    });

  } catch (error) {
    console.error('❌ Error checking models:', error.message);
  }
}

checkAvailableModels();
