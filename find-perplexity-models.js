#!/usr/bin/env node

/**
 * Find Perplexity models available through OpenRouter
 */

const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
  console.log('❌ OPENROUTER_API_KEY not found in .env.local');
  process.exit(1);
}

async function findPerplexityModels() {
  console.log('🔍 Searching for Perplexity models...\n');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const models = data.data || [];

    // Filter for Perplexity models
    const perplexityModels = models.filter(model => 
      model.id && model.id.toLowerCase().includes('perplexity')
    );

    console.log(`📊 Found ${perplexityModels.length} Perplexity models:`);
    
    if (perplexityModels.length > 0) {
      perplexityModels.forEach(model => {
        console.log(`  • ${model.id} - ${model.name || 'No name'} - $${model.pricing?.prompt || 'N/A'}/${model.pricing?.completion || 'N/A'}`);
      });
      
      // Test the first available Perplexity model
      const firstModel = perplexityModels[0];
      console.log(`\n🧪 Testing ${firstModel.id}...`);
      
      const testResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://centennialhillshomesforsale.com',
          'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
        },
        body: JSON.stringify({
          model: firstModel.id,
          messages: [
            {
              role: 'user',
              content: 'Hello, can you help me generate a luxury real estate hero image?'
            }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (testResponse.ok) {
        console.log(`✅ ${firstModel.id} - Accessible`);
      } else {
        const errorText = await testResponse.text();
        console.log(`❌ ${firstModel.id} - ${testResponse.status}: ${errorText}`);
      }
      
    } else {
      console.log('❌ No Perplexity models found in the available models list.');
      console.log('\n🔍 Let me search for models with "perplexity" in the name...');
      
      const allModels = models.filter(model => 
        model.name && model.name.toLowerCase().includes('perplexity')
      );
      
      if (allModels.length > 0) {
        console.log(`📊 Found ${allModels.length} models with "perplexity" in name:`);
        allModels.forEach(model => {
          console.log(`  • ${model.id} - ${model.name} - $${model.pricing?.prompt || 'N/A'}/${model.pricing?.completion || 'N/A'}`);
        });
      } else {
        console.log('❌ No models with "perplexity" in the name found either.');
      }
    }

  } catch (error) {
    console.error('❌ Error searching for Perplexity models:', error.message);
  }
}

// Run the search
findPerplexityModels();
