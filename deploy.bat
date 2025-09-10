@echo off
echo 🚀 Desplegando Gana Facil a Firebase...
echo.

echo 📋 Verificando proyecto Firebase...
firebase use  das dises que la en español esta mas completagana-facil-rifa-d5609

echo.
echo 🔨 Construyendo aplicación...
npm run build

echo.
echo 🔥 Desplegando a Firebase...
firebase deploy --only hosting

echo.
echo ✅ ¡Despliegue completado!
echo 🌐 Tu aplicación está disponible en: https://gana-facil-rifa-d5609.web.app
pause
