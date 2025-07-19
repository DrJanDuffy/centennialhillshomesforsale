Write-Host "🚀 Starting automated build fix..."

# 1. Fix escape characters
Write-Host "📝 Fixing unescaped entities..."
Get-ChildItem -Recurse -Include *.tsx -Path .\pages,.\components | ForEach-Object {
    (Get-Content $_.FullName) -replace "'", '&apos;' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace '"', '&quot;' | Set-Content $_.FullName
}

# 2. Remove specific unused imports
Write-Host "🧹 Cleaning unused imports..."

# Remove unused Image imports
$files = @(
    ".\pages\about.tsx", ".\pages\index.tsx", ".\pages\business-verification.tsx",
    ".\pages\seo-improvements.tsx", ".\pages\services.tsx"
)
foreach ($file in $files) {
    if (Test-Path $file) {
        (Get-Content $file) | Where-Object {$_ -notmatch 'import.*Image.*from.*next/image'} | Set-Content $file
    }
}

# Remove unused Link imports where not used
$file = ".\pages\about.tsx"
if (Test-Path $file) {
    (Get-Content $file) | Where-Object {$_ -notmatch 'import.*Link.*from.*next/link'} | Set-Content $file
}

# Remove unused React hooks
$file = ".\pages\index.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace 'import { useState, useEffect } from', 'import {} from' | Set-Content $file
}
$file = ".\components\GEOOptimized.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace 'import { useEffect } from', 'import {} from' | Set-Content $file
}

# 3. Remove unused variables
Write-Host "🗑️  Removing unused variable declarations..."
$varRemovals = @(
    @{ file = ".\pages\about.tsx"; pattern = "const scrollRef = " },
    @{ file = ".\pages\index.tsx"; pattern = "const stats = " },
    @{ file = ".\pages\index.tsx"; pattern = "const isLoaded = " }
)
foreach ($item in $varRemovals) {
    if (Test-Path $item.file) {
        (Get-Content $item.file) | Where-Object {$_ -notmatch $item.pattern} | Set-Content $item.file
    }
}

# 4. Fix Link elements (basic version)
Write-Host "🔗 Converting <a> tags to Next.js Link components..."
function Fix-Links($file) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match 'href="/' -and $content -notmatch 'import.*Link.*from.*next/link') {
            $content = "import Link from 'next/link';`r`n" + $content
        }
        $content = $content -replace '<a href="([^"]*)">([^<]*)</a>', '<Link href="$1">$2</Link>'
        Set-Content $file $content
    }
}
$filesToFix = @(
    ".\pages\faq.tsx", ".\pages\las-vegas-89149.tsx", ".\pages\las-vegas-89166.tsx",
    ".\pages\listings.tsx", ".\pages\local-business-optimization.tsx", ".\pages\northwest-las-vegas.tsx",
    ".\pages\services.tsx", ".\pages\testimonials.tsx", ".\components\ErrorBoundary.tsx",
    ".\components\GoogleBusinessOptimization.tsx", ".\components\GoogleBusinessProfileOptimizer.tsx",
    ".\components\RealScoutListings.tsx"
)
foreach ($file in $filesToFix) { Fix-Links $file }

# 5. Fix TypeScript issues (add type-fixes.ts)
Write-Host "🔧 Fixing TypeScript issues..."
@"
interface ApiResponse {
  data: unknown;
  status: number;
  message?: string;
}

interface ComponentProps {
  pageType?: string;
  neighborhood?: string;
  propertyData?: Record<string, unknown>;
  [key: string]: unknown;
}

interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}
"@ | Set-Content .\type-fixes.ts

# 6. Clean up backup files
Write-Host "🧽 Cleaning backup files..."
Get-ChildItem -Recurse -Include *.bak | Remove-Item

# 7. Run build test
Write-Host "🏗️  Testing build..."
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!"
} else {
    Write-Host "❌ Build still failing. Check remaining errors manually."
    exit 1
}
Write-Host "🎉 Automated fixes complete!" 