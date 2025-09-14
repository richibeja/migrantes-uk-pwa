# verify-vercel-deployment.ps1
# Script de verificación para despliegue en Vercel

Write-Host "🔍 Verificando compatibilidad con Vercel..." -ForegroundColor Green

# 1. Verificar que no hay dependencias nativas problemáticas
Write-Host "📦 Verificando dependencias nativas..." -ForegroundColor Yellow
$problematicDeps = npm list --depth=0 2>$null | Select-String -Pattern "gl|canvas|sharp|bcrypt|sqlite3"
if ($problematicDeps) {
    Write-Host "❌ Se encontraron dependencias nativas problemáticas:" -ForegroundColor Red
    $problematicDeps | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    exit 1
} else {
    Write-Host "✅ No se encontraron dependencias nativas problemáticas" -ForegroundColor Green
}

# 2. Verificar build
Write-Host "🔨 Verificando build..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error en build" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build exitoso" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en build: $_" -ForegroundColor Red
    exit 1
}

# 3. Verificar estructura de output
Write-Host "📁 Verificando estructura de output..." -ForegroundColor Yellow
if (-not (Test-Path ".next")) {
    Write-Host "❌ No se generó directorio .next" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Directorio .next generado correctamente" -ForegroundColor Green

# 4. Verificar que los archivos críticos existen
Write-Host "📄 Verificando archivos críticos..." -ForegroundColor Yellow
$criticalFiles = @(
    "public/manifest.json",
    "vercel.json",
    "next.config.js"
)

foreach ($file in $criticalFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "❌ No se encuentra $file" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Todos los archivos críticos encontrados" -ForegroundColor Green

# 5. Verificar configuración de Vercel
Write-Host "⚙️ Verificando configuración de Vercel..." -ForegroundColor Yellow
$vercelConfig = Get-Content "vercel.json" | ConvertFrom-Json
if (-not $vercelConfig.framework -eq "nextjs") {
    Write-Host "❌ Configuración de framework incorrecta" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Configuración de Vercel válida" -ForegroundColor Green

Write-Host "🎉 Proyecto compatible con Vercel - Listo para desplegar" -ForegroundColor Green
Write-Host "🚀 Ejecuta: npx vercel --prod --confirm" -ForegroundColor Cyan
