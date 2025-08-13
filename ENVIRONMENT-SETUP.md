# 🔐 Environment Variables Setup Guide

## 🚨 **SECURITY WARNING**
**NEVER commit environment variables to Git!** All sensitive data must be stored in Vercel Dashboard and GitHub Secrets.

## 📋 **Required Environment Variables**

### **1. Vercel Dashboard Configuration**
Navigate to: `https://vercel.com/dashboard/[project]/settings/environment-variables`

#### **Production Environment**
```bash
# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Perplexity AI API
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here

# OpenAI API (if using AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Vercel Environment
NEXT_PUBLIC_VERCEL_ENV=production
```

#### **Preview Environment**
```bash
# Same variables as production but with preview values
NEXT_PUBLIC_VERCEL_ENV=preview
```

#### **Development Environment**
```bash
# Same variables as production but with development values
NEXT_PUBLIC_VERCEL_ENV=development
```

### **2. GitHub Secrets Configuration**
Navigate to: `https://github.com/[username]/[repo]/settings/secrets/actions`

#### **Required Secrets**
```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here

# Optional: Additional API keys for testing
PERPLEXITY_API_KEY=your_perplexity_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

## 🔧 **How to Get Vercel Credentials**

### **1. Vercel Token**
1. Go to `https://vercel.com/account/tokens`
2. Click "Create Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token value

### **2. Vercel Org ID**
1. Go to `https://vercel.com/dashboard`
2. Click on your organization
3. Copy the ID from the URL or settings

### **3. Vercel Project ID**
1. Go to your project dashboard
2. Click "Settings"
3. Copy the Project ID

## 📁 **Local Development Setup**

### **1. Create .env.local (Never commit this file!)**
```bash
# Copy env-template.txt to .env.local
cp env-template.txt .env.local

# Edit .env.local with your actual values
nano .env.local
```

### **2. .env.local Content**
```bash
# Development Environment Variables
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
PERPLEXITY_API_KEY=your_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_VERCEL_ENV=development
```

### **3. Add .env.local to .gitignore**
```bash
# Ensure this line exists in .gitignore
echo ".env.local" >> .gitignore
```

## 🚀 **Environment Variable Usage in Code**

### **1. Client-Side Variables (NEXT_PUBLIC_ prefix)**
```typescript
// ✅ Correct - Client-side accessible
const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// ❌ Wrong - Server-side only
const apiKey = process.env.PERPLEXITY_API_KEY;
```

### **2. Server-Side Variables (No NEXT_PUBLIC_ prefix)**
```typescript
// ✅ Correct - Server-side only
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  // Use the API key
}
```

### **3. Environment-Specific Logic**
```typescript
const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
const isDevelopment = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development';

if (isDevelopment) {
  console.log('Development mode - verbose logging enabled');
}
```

## 🔒 **Security Best Practices**

### **1. Never Do This**
```typescript
// ❌ NEVER hardcode API keys
const apiKey = "AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo";

// ❌ NEVER commit .env files
// ❌ NEVER log environment variables
console.log('API Key:', process.env.API_KEY);
```

### **2. Always Do This**
```typescript
// ✅ Use environment variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// ✅ Validate environment variables
if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable is required');
}

// ✅ Use TypeScript for type safety
interface Config {
  apiKey: string;
  environment: string;
}

const config: Config = {
  apiKey: process.env.API_KEY || '',
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'
};
```

## 🧪 **Testing Environment Variables**

### **1. Local Testing**
```bash
# Test that environment variables are loaded
npm run dev

# Check in browser console
console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);
```

### **2. Build Testing**
```bash
# Test build with environment variables
npm run build

# Check that build succeeds
```

### **3. Vercel Testing**
```bash
# Test preview deployment
vercel --prod=false

# Test production deployment
vercel --prod
```

## 📊 **Environment Variable Validation**

### **1. Create Validation Script**
```typescript
// scripts/validate-env.ts
const requiredEnvVars = [
  'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
  'PERPLEXITY_API_KEY',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID'
];

export function validateEnvironment() {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return true;
}
```

### **2. Use in API Routes**
```typescript
// pages/api/example.ts
import { validateEnvironment } from '../../scripts/validate-env';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    validateEnvironment();
    // Continue with API logic
  } catch (error) {
    res.status(500).json({ error: 'Environment configuration error' });
  }
}
```

## 🔄 **Environment Variable Updates**

### **1. Adding New Variables**
1. Add to Vercel Dashboard
2. Add to GitHub Secrets (if needed for CI/CD)
3. Update env-template.txt
4. Update local .env.local
5. Update code to use new variables

### **2. Updating Existing Variables**
1. Update in Vercel Dashboard
2. Update in GitHub Secrets
3. Update local .env.local
4. Redeploy if necessary

### **3. Removing Variables**
1. Remove from Vercel Dashboard
2. Remove from GitHub Secrets
3. Remove from code
4. Update documentation

## 📞 **Troubleshooting**

### **1. Common Issues**
- **Variable not accessible**: Check NEXT_PUBLIC_ prefix
- **Build fails**: Verify all required variables are set
- **Runtime errors**: Check variable names and values

### **2. Debug Commands**
```bash
# Check environment variables in build
npm run build

# Check Vercel environment
vercel env ls

# Check GitHub secrets
# Go to repository settings > secrets and variables > actions
```

### **3. Support Resources**
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
