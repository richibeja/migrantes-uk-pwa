# PowerShell script to deploy PWA fixes
Write-Host "🚀 Deploying PWA fixes to Vercel..." -ForegroundColor Green

# Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🔗 Test your PWA at: https://gana-facil-7d54ub3o2-ganafacils-projects.vercel.app" -ForegroundColor Cyan
Write-Host "🧪 Test PWA functionality at: https://gana-facil-7d54ub3o2-ganafacils-projects.vercel.app/pwa-test.html" -ForegroundColor Cyan
