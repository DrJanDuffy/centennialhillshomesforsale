#!/usr/bin/env node

/**
 * Check available Gemini models through OpenRouter
 */

const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
  console.log('❌ OPENROUTER_API_KEY not found in .env.local');
  process.exit(1);
}

async function checkGeminiModels() {
  console.log('🔍 Checking available Gemini models through OpenRouter...\n');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
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
      console.log('\n📋 All available models:');
      data.data.slice(0, 20).forEach(model => {
        console.log(`• ${model.id}`);
      });
      if (data.data.length > 20) {
        console.log(`... and ${data.data.length - 20} more models`);
      }
    }

  } catch (error) {
    console.error('❌ Error checking models:', error.message);
  }
}

checkGeminiModels();
