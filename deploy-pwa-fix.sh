#!/bin/bash

echo "🚀 Deploying PWA fixes to Vercel..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Test your PWA at: https://gana-facil-7d54ub3o2-ganafacils-projects.vercel.app"
echo "🧪 Test PWA functionality at: https://gana-facil-7d54ub3o2-ganafacils-projects.vercel.app/pwa-test.html"
