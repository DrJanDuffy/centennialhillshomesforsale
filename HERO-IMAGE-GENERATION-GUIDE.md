# 🎨 Hero Image Generation Guide

## 🚀 **Multiple Ways to Generate Your Hero Image**

I've created several options for you to generate your luxury real estate hero image. Choose the method that works best for you:

## 🎯 **Method 1: DALL-E 3 via OpenAI API (Recommended)**

### **Setup:**
1. **Get OpenAI API Key:**
   - Go to: https://platform.openai.com/api-keys
   - Sign in to your OpenAI account
   - Create a new API key
   - Copy the key

2. **Add to Environment:**
   ```bash
   # Add to .env.local
   OPENAI_API_KEY=your-actual-openai-api-key
   ```

3. **Generate Image:**
   ```bash
   node generate-hero-dalle3.js
   ```

### **Features:**
- ✅ Direct API integration
- ✅ High-quality DALL-E 3 generation
- ✅ Automatic download and save
- ✅ Optimized for web use

---

## 🎯 **Method 2: ChatGPT Plus (Manual)**

### **Steps:**
1. **Go to:** https://chat.openai.com/
2. **Sign in** to ChatGPT Plus
3. **Select DALL-E 3**
4. **Use this prompt:**

```
Create a breathtaking, high-end real estate hero image featuring a sleek, modern luxury home in Centennial Hills, Las Vegas, with a majestic mountainous backdrop of the Spring Mountains and Red Rock Canyon. The scene should showcase a stunning example of luxury living, with:

- Clean, minimalist architectural lines, accented by rich, natural stone finishes and gleaming glass, metal, and wood elements
- A sprawling desert landscape with a mix of Joshua trees, cacti, and carefully curated desert shrubs, showcasing the property's seamless integration with its natural surroundings
- Soothing, warm golden hour lighting, with long shadows cast across the property, emphasizing the textures and lines of the modern design
- A dramatic, partly cloudy blue sky with hints of warm golden tones, setting the tone for an aspirational, high-end lifestyle
- Perfect, precision-crafted landscaping, featuring a curated selection of drought-resistant, desert-friendly plants, adding pops of color and texture to the scene
- A wide-angle composition, showcasing the full property, with a seamless blend of indoors and outdoors, highlighting the seamless flow of living spaces
- A warm, inviting color palette with a balance of soothing blues, rich golds, and earthy tones, evoking a sense of serenity and luxury
- A high-resolution image with a 16:9 aspect ratio, perfect for social media, advertising, and marketing materials
- A professional, aspirational aesthetic, capturing the essence of luxury living in the Nevada desert, with a sense of exclusivity and sophistication.
```

5. **Download** the generated image
6. **Save as:** `hero-image.jpg` in `public/images/`

---

## 🎯 **Method 3: Midjourney (Alternative)**

### **Steps:**
1. **Join Midjourney Discord**
2. **Use this prompt:**

```
/imagine prompt: A breathtaking luxury modern home in Centennial Hills, Las Vegas at golden hour. Ultra-high-end contemporary architecture with clean minimalist lines, floor-to-ceiling glass windows, natural stone accents, rich wood and metal details. Sprawling desert landscape with Joshua trees, saguaro cacti, and carefully curated drought-resistant plants. Majestic Spring Mountains and Red Rock Canyon backdrop with dramatic partly cloudy blue sky showing warm golden tones. Perfect precision landscaping with desert-friendly plants adding color and texture. Wide-angle composition showing seamless indoor-outdoor living flow. Warm golden hour lighting creating long shadows that emphasize textures and architectural lines. Professional luxury real estate photography style, 16:9 aspect ratio, ultra-high resolution, aspirational and sophisticated aesthetic. Color palette of soothing blues, rich golds, and warm earthy desert tones. Dramatic lighting showcasing the property's integration with the Nevada desert environment. Exclusive, high-end lifestyle imagery perfect for luxury real estate marketing. --ar 16:9 --v 6
```

3. **Download** the generated image
4. **Save as:** `hero-image.jpg` in `public/images/`

---

## 🎯 **Method 4: Adobe Firefly (Free Alternative)**

### **Steps:**
1. **Go to:** https://firefly.adobe.com/
2. **Sign in** with Adobe account
3. **Use this prompt:**

```
A luxury modern home in Centennial Hills, Las Vegas with Spring Mountains backdrop. Contemporary architecture with glass windows, stone accents, desert landscape with Joshua trees and cacti. Golden hour lighting, professional real estate photography style, 16:9 aspect ratio, high resolution, aspirational aesthetic.
```

4. **Download** the generated image
5. **Save as:** `hero-image.jpg` in `public/images/`

---

## 🎯 **Method 5: Stable Diffusion (Free)**

### **Steps:**
1. **Go to:** https://huggingface.co/spaces/stabilityai/stable-diffusion
2. **Use this prompt:**

```
A breathtaking luxury modern home in Centennial Hills, Las Vegas at golden hour. Ultra-high-end contemporary architecture with clean minimalist lines, floor-to-ceiling glass windows, natural stone accents, rich wood and metal details. Sprawling desert landscape with Joshua trees, saguaro cacti, and carefully curated drought-resistant plants. Majestic Spring Mountains and Red Rock Canyon backdrop with dramatic partly cloudy blue sky showing warm golden tones. Perfect precision landscaping with desert-friendly plants adding color and texture. Wide-angle composition showing seamless indoor-outdoor living flow. Warm golden hour lighting creating long shadows that emphasize textures and architectural lines. Professional luxury real estate photography style, 16:9 aspect ratio, ultra-high resolution, aspirational and sophisticated aesthetic. Color palette of soothing blues, rich golds, and warm earthy desert tones. Dramatic lighting showcasing the property's integration with the Nevada desert environment. Exclusive, high-end lifestyle imagery perfect for luxury real estate marketing.
```

3. **Download** the generated image
4. **Save as:** `hero-image.jpg` in `public/images/`

---

## 🧪 **Test Your Integration**

After generating your hero image:

```bash
# Test if your hero image is properly placed
node test-hero-image.js

# Start your development server
npm run dev

# Visit the test page
http://localhost:3000/luxury-hero-test
```

---

## 🎨 **Image Specifications**

- **Aspect Ratio:** 16:9 (1920x1080 or similar)
- **Format:** JPG
- **File Name:** `hero-image.jpg`
- **Location:** `public/images/hero-image.jpg`
- **Quality:** High resolution for web use
- **Style:** Professional luxury real estate photography

---

## 🚀 **Quick Start (Recommended)**

1. **Get OpenAI API Key:** https://platform.openai.com/api-keys
2. **Add to .env.local:** `OPENAI_API_KEY=your-key`
3. **Run:** `node generate-hero-dalle3.js`
4. **Test:** `node test-hero-image.js`
5. **View:** `http://localhost:3000/luxury-hero-test`

---

## ✨ **Your Hero Section is Ready!**

Once you generate your hero image, your luxury real estate website will have a stunning, professional hero section that will impress your clients and drive conversions!

**Choose your preferred method and let's create your masterpiece!** 🏠✨
