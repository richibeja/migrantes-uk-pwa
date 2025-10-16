Write-Host "=== 🚀 Iniciando setup de Gana Fácil ==="

# Ir a la carpeta del proyecto
cd C:\Users\ALP\gana-facil

# Instalar dependencias raíz
Write-Host "📦 Instalando dependencias raíz..."
npm ci

# Instalar y compilar funciones
Write-Host "📦 Instalando dependencias de functions..."
cd functions
npm ci
Write-Host "🔨 Compilando funciones..."
npm run build
cd ..

# Login en Firebase (interactivo, abre navegador)
Write-Host "🔑 Iniciando sesión en Firebase..."
firebase login

# Deploy selectivo
Write-Host "☁️ Deploy a Firebase (función + reglas)..."
firebase deploy --only functions:getPublicCaseByCode,firestore:rules

# Levantar app local
Write-Host "🌐 Iniciando servidor local en http://localhost:3000 ..."
npm run dev













