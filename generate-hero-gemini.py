#!/usr/bin/env python3

"""
Generate Hero Image using Google Gemini 2.5 Flash via OpenRouter (Python Implementation)
This script uses the proper OpenRouter API format as shown in the user's example
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')

if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == 'your-openrouter-api-key-here':
    print('❌ OPENROUTER_API_KEY not found in .env.local')
    print('📋 Please add your OpenRouter API key to .env.local:')
    print('   OPENROUTER_API_KEY=your-actual-openrouter-api-key')
    print('\n🔗 Get your API key from: https://openrouter.ai/keys')
    exit(1)

def generate_hero_image():
    print('🎨 Generating luxury hero image with Google Gemini 2.5 Flash...\n')

    prompt = """Create a breathtaking, high-end real estate hero image featuring a sleek, modern luxury home in Centennial Hills, Las Vegas, with a majestic mountainous backdrop of the Spring Mountains and Red Rock Canyon. The scene should showcase a stunning example of luxury living, with:

- Clean, minimalist architectural lines, accented by rich, natural stone finishes and gleaming glass, metal, and wood elements
- A sprawling desert landscape with a mix of Joshua trees, cacti, and carefully curated desert shrubs, showcasing the property's seamless integration with its natural surroundings
- Soothing, warm golden hour lighting, with long shadows cast across the property, emphasizing the textures and lines of the modern design
- A dramatic, partly cloudy blue sky with hints of warm golden tones, setting the tone for an aspirational, high-end lifestyle
- Perfect, precision-crafted landscaping, featuring a curated selection of drought-resistant, desert-friendly plants, adding pops of color and texture to the scene
- A wide-angle composition, showcasing the full property, with a seamless blend of indoors and outdoors, highlighting the seamless flow of living spaces
- A warm, inviting color palette with a balance of soothing blues, rich golds, and earthy tones, evoking a sense of serenity and luxury
- A high-resolution image with a 16:9 aspect ratio, perfect for social media, advertising, and marketing materials
- A professional, aspirational aesthetic, capturing the essence of luxury living in the Nevada desert, with a sense of exclusivity and sophistication."""

    try:
        print('🚀 Sending request to OpenRouter with Gemini 2.5 Flash...')
        
        response = requests.post(
            'https://openrouter.ai/api/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {OPENROUTER_API_KEY}',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://centennialhillshomesforsale.com',
                'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
            },
            json={
                'model': 'google/gemini-2.5-flash-image-preview:free',
                'messages': [
                    {
                        'role': 'user',
                        'content': [
                            {
                                'type': 'text',
                                'text': f'Generate a high-quality real estate hero image with this description: {prompt}. Please provide the image as a base64 encoded string or direct URL.'
                            }
                        ]
                    }
                ],
                'max_tokens': 4000,
                'temperature': 0.7
            }
        )

        if not response.ok:
            print(f'❌ API Error: {response.status_code} {response.reason}')
            print(f'Error details: {response.text}')
            raise Exception(f'API request failed: {response.status_code} {response.reason}')

        data = response.json()
        print('✅ Response received from Gemini 2.5 Flash!')
        print(f'📝 Response preview: {json.dumps(data, indent=2)[:500]}...')

        # Check if we got an image URL or base64 data
        if data.get('choices') and data['choices'][0].get('message'):
            message_content = data['choices'][0]['message']['content']
            print(f'📄 Message content type: {type(message_content)}')
            
            if isinstance(message_content, str):
                # Try to extract image URL or base64 from the response
                import re
                url_match = re.search(r'https?://[^\s]+\.(jpg|jpeg|png|webp)', message_content, re.IGNORECASE)
                base64_match = re.search(r'data:image/[^;]+;base64,([A-Za-z0-9+/=]+)', message_content)
                
                if url_match:
                    image_url = url_match.group(0)
                    print(f'🖼️  Found image URL: {image_url}')
                    download_and_save_image(image_url)
                elif base64_match:
                    base64_data = base64_match.group(1)
                    print('🖼️  Found base64 image data')
                    save_base64_image(base64_data)
                else:
                    print('⚠️  No image found in response. This model may be for image analysis, not generation.')
                    print(f'📝 Full response: {message_content}')
                    print('\n🔄 Trying alternative approach...')
                    try_alternative_generation()
            else:
                print('⚠️  Unexpected response format')
                print(f'📝 Full response: {json.dumps(data, indent=2)}')
        else:
            print('❌ No valid response structure found')
            print(f'📝 Full response: {json.dumps(data, indent=2)}')

    except Exception as error:
        print(f'❌ Error generating image: {str(error)}')
        
        if 'API request failed' in str(error):
            print('\n🔧 Troubleshooting:')
            print('1. Check your OpenRouter API key in .env.local')
            print('2. Ensure you have credits in your OpenRouter account')
            print('3. Try again in a few minutes if rate limited')
            print('4. Get your API key from: https://openrouter.ai/keys')

def download_and_save_image(image_url):
    try:
        print('📥 Downloading image from URL...')
        
        image_response = requests.get(image_url)
        if not image_response.ok:
            raise Exception('Failed to download image from URL')
        
        save_image_buffer(image_response.content)
        
    except Exception as error:
        print(f'❌ Error downloading image: {str(error)}')

def save_base64_image(base64_data):
    try:
        print('💾 Saving base64 image...')
        
        import base64
        image_buffer = base64.b64decode(base64_data)
        save_image_buffer(image_buffer)
        
    except Exception as error:
        print(f'❌ Error saving base64 image: {str(error)}')

def save_image_buffer(image_buffer):
    # Ensure images directory exists
    images_dir = 'public/images'
    os.makedirs(images_dir, exist_ok=True)
    print('📁 Created public/images directory')
    
    # Save the image
    image_path = os.path.join(images_dir, 'hero-image.jpg')
    with open(image_path, 'wb') as f:
        f.write(image_buffer)
    
    file_size_kb = len(image_buffer) // 1024
    
    print('🎉 Hero image saved successfully!')
    print(f'📁 Location: {image_path}')
    print(f'📏 File size: {file_size_kb} KB')
    print(f'📅 Generated: {__import__("datetime").datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    
    if file_size_kb > 1000:
        print('⚠️  Large file size detected. Consider optimizing for web use.')
    
    print('\n🌐 Test your hero section at: http://localhost:3000/luxury-hero-test')
    print('✨ Your luxury real estate hero section is ready! ✨')

def try_alternative_generation():
    print('🔄 Attempting alternative generation method...')
    
    try:
        # Try a different approach - ask Gemini to describe the image in detail
        response = requests.post(
            'https://openrouter.ai/api/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {OPENROUTER_API_KEY}',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://centennialhillshomesforsale.com',
                'X-Title': 'Centennial Hills Real Estate Hero Image Generator'
            },
            json={
                'model': 'google/gemini-2.5-flash',
                'messages': [
                    {
                        'role': 'user',
                        'content': 'I need you to help me create a detailed prompt for generating a luxury real estate hero image. Please provide a very detailed, specific prompt that I can use with DALL-E 3, Midjourney, or other image generation tools. The image should be of a modern luxury home in Centennial Hills, Las Vegas with Spring Mountains backdrop. Make the prompt extremely detailed and specific for best results.'
                    }
                ],
                'max_tokens': 2000,
                'temperature': 0.7
            }
        )

        if response.ok:
            data = response.json()
            if data.get('choices') and data['choices'][0].get('message'):
                enhanced_prompt = data['choices'][0]['message']['content']
                print('✨ Enhanced prompt generated by Gemini:')
                print(f'📝 {enhanced_prompt}')
                
                # Save the enhanced prompt to a file
                with open('enhanced-hero-prompt.txt', 'w') as f:
                    f.write(enhanced_prompt)
                print('💾 Enhanced prompt saved to: enhanced-hero-prompt.txt')
                print('\n🎯 Use this enhanced prompt with:')
                print('• DALL-E 3: https://chat.openai.com/')
                print('• Midjourney: https://midjourney.com/')
                print('• Adobe Firefly: https://firefly.adobe.com/')
                print('• Stable Diffusion: https://huggingface.co/spaces/stabilityai/stable-diffusion')
    except Exception as error:
        print(f'❌ Alternative generation failed: {str(error)}')

# Run the image generation
if __name__ == '__main__':
    generate_hero_image()
