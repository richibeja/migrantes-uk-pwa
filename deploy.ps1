Write-Host "🚀 Desplegando Gana Facil a Firebase..." -ForegroundColor Green
Write-Host ""

Write-Host "📋 Verificando proyecto Firebase..." -ForegroundColor Yellow
firebase use gana-facil-rifa-d5609

Write-Host ""
Write-Host "🔨 Construyendo aplicación..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "🔥 Desplegando a Firebase..." -ForegroundColor Yellow
firebase deploy --only hosting

Write-Host ""
Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host "🌐 Tu aplicación está disponible en: https://gana-facil-rifa-d5609.web.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
