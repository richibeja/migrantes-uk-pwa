@echo off
echo Desplegando cambios urgentes...
git add .
git commit -m "URGENT: Landing page optimization for running ads"
git push origin main --force
echo Despliegue completado!
pause
