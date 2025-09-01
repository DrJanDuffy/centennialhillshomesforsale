#!/usr/bin/env node

/**
 * Comprehensive OpenRouter Features Audit
 * This script will audit all available features, models, and capabilities
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
  console.log('❌ OPENROUTER_API_KEY not found in .env.local');
  process.exit(1);
}

async function auditOpenRouterFeatures() {
  console.log('🔍 Comprehensive OpenRouter Features Audit\n');
  console.log('=' .repeat(60));

  try {
    // 1. Check API Key Status
    console.log('\n📋 1. API Key Status Check');
    console.log('-'.repeat(30));
    console.log(`✅ API Key found: ${OPENROUTER_API_KEY.substring(0, 10)}...`);
    
    // 2. Get Available Models
    console.log('\n📋 2. Available Models');
    console.log('-'.repeat(30));
    
    const modelsResponse = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!modelsResponse.ok) {
      const errorText = await modelsResponse.text();
      console.log('❌ Failed to fetch models:', modelsResponse.status, modelsResponse.statusText);
      console.log('Error details:', errorText);
      return;
    }

    const modelsData = await modelsResponse.json();
    const models = modelsData.data;
    
    console.log(`📊 Total models available: ${models.length}`);
    
    // Categorize models
    const categories = {
      'Google/Gemini': models.filter(m => m.id.toLowerCase().includes('google') || m.id.toLowerCase().includes('gemini')),
      'OpenAI/GPT': models.filter(m => m.id.toLowerCase().includes('openai') || m.id.toLowerCase().includes('gpt')),
      'Anthropic/Claude': models.filter(m => m.id.toLowerCase().includes('anthropic') || m.id.toLowerCase().includes('claude')),
      'Meta/Llama': models.filter(m => m.id.toLowerCase().includes('meta') || m.id.toLowerCase().includes('llama')),
      'Image Generation': models.filter(m => m.id.toLowerCase().includes('image') || m.id.toLowerCase().includes('dall') || m.id.toLowerCase().includes('midjourney')),
      'Free Models': models.filter(m => m.id.includes(':free')),
      'Paid Models': models.filter(m => !m.id.includes(':free'))
    };

    // Display categories
    Object.entries(categories).forEach(([category, modelList]) => {
      if (modelList.length > 0) {
        console.log(`\n🎯 ${category}: ${modelList.length} models`);
        modelList.slice(0, 5).forEach(model => {
          const pricing = model.pricing ? `$${model.pricing.prompt}/${model.pricing.completion}` : 'Free';
          console.log(`  • ${model.id} - ${pricing}`);
        });
        if (modelList.length > 5) {
          console.log(`  ... and ${modelList.length - 5} more`);
        }
      }
    });

    // 3. Test Model Access
    console.log('\n📋 3. Model Access Testing');
    console.log('-'.repeat(30));
    
    const testModels = [
      'google/gemini-2.5-flash',
      'google/gemini-2.5-flash-image-preview:free',
      'openai/gpt-4o',
      'anthropic/claude-3-5-sonnet',
      'google/gemma-3n-e2b-it:free'
    ];

    for (const modelId of testModels) {
      try {
        console.log(`🧪 Testing ${modelId}...`);
        
        const testResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://centennialhillshomesforsale.com',
            'X-Title': 'OpenRouter Features Audit'
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              {
                role: 'user',
                content: 'Hello, this is a test message. Please respond with "Test successful".'
              }
            ],
            max_tokens: 10,
            temperature: 0.1
          })
        });

        if (testResponse.ok) {
          const testData = await testResponse.json();
          console.log(`  ✅ ${modelId} - Accessible`);
        } else {
          const errorText = await testResponse.text();
          const errorData = JSON.parse(errorText);
          console.log(`  ❌ ${modelId} - ${testResponse.status}: ${errorData.error?.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.log(`  ❌ ${modelId} - Error: ${error.message}`);
      }
    }

    // 4. Check Account Information
    console.log('\n📋 4. Account Information');
    console.log('-'.repeat(30));
    
    try {
      const accountResponse = await fetch('https://openrouter.ai/api/v1/auth/key', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (accountResponse.ok) {
        const accountData = await accountResponse.json();
        console.log('✅ Account information retrieved:');
        console.log(`  • Key ID: ${accountData.id}`);
        console.log(`  • Name: ${accountData.name || 'Not set'}`);
        console.log(`  • Created: ${new Date(accountData.created_at).toLocaleDateString()}`);
        console.log(`  • Usage: ${accountData.usage || 'Not available'}`);
      } else {
        console.log('❌ Could not retrieve account information');
      }
    } catch (error) {
      console.log('❌ Error retrieving account information:', error.message);
    }

    // 5. Check Rate Limits
    console.log('\n📋 5. Rate Limit Information');
    console.log('-'.repeat(30));
    
    try {
      const rateLimitResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://centennialhillshomesforsale.com',
          'X-Title': 'Rate Limit Test'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'user',
              content: 'Test'
            }
          ],
          max_tokens: 1
        })
      });

      const rateLimitHeaders = {
        'x-ratelimit-limit': rateLimitResponse.headers.get('x-ratelimit-limit'),
        'x-ratelimit-remaining': rateLimitResponse.headers.get('x-ratelimit-remaining'),
        'x-ratelimit-reset': rateLimitResponse.headers.get('x-ratelimit-reset')
      };

      console.log('📊 Rate limit headers:');
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        if (value) {
          console.log(`  • ${key}: ${value}`);
        }
      });
    } catch (error) {
      console.log('❌ Error checking rate limits:', error.message);
    }

    // 6. Image Generation Capabilities
    console.log('\n📋 6. Image Generation Capabilities');
    console.log('-'.repeat(30));
    
    const imageModels = models.filter(m => 
      m.id.toLowerCase().includes('image') || 
      m.id.toLowerCase().includes('dall') ||
      m.id.toLowerCase().includes('midjourney') ||
      m.id.toLowerCase().includes('stable')
    );

    if (imageModels.length > 0) {
      console.log('🎨 Image generation models found:');
      imageModels.forEach(model => {
        console.log(`  • ${model.id} - ${model.name || 'No description'}`);
      });
    } else {
      console.log('❌ No image generation models found');
    }

    // 7. Recommendations
    console.log('\n📋 7. Recommendations');
    console.log('-'.repeat(30));
    
    const workingModels = categories['Free Models'].filter(m => m.id.includes('free'));
    if (workingModels.length > 0) {
      console.log('✅ Recommended free models to try:');
      workingModels.slice(0, 3).forEach(model => {
        console.log(`  • ${model.id}`);
      });
    }

    console.log('\n💡 Next steps:');
    console.log('  1. Try using the free models that are accessible');
    console.log('  2. Check your OpenRouter account dashboard for billing/credits');
    console.log('  3. Consider upgrading your account for access to premium models');
    console.log('  4. Use the pre-optimized prompts in GEMINI-IMAGE-GENERATION-GUIDE.md');

  } catch (error) {
    console.error('❌ Audit failed:', error.message);
  }
}

// Run the audit
auditOpenRouterFeatures();
