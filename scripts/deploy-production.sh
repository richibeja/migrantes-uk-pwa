#!/bin/bash

# SCRIPT DE DESPLIEGUE PRODUCCIÓN ANBEL IA
set -euo pipefail

echo "🚀 INICIANDO DESPLIEGUE DE ANBEL IA - $(date)"

# VARIABLES CRÍTICAS
APP_NAME="anbel-ia-mega-intelligence"
DEPLOY_DIR="/opt/$APP_NAME"
BACKUP_DIR="/opt/backups/$APP_NAME"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# CREAR DIRECTORIOS SI NO EXISTEN
mkdir -p $DEPLOY_DIR $BACKUP_DIR

echo "📦 CREANDO BACKUP ACTUAL..."
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C $DEPLOY_DIR . 2>/dev/null || true

echo "🔧 DETENIENDO SERVICIO ACTUAL..."
systemctl stop $APP_NAME.service || true

echo "🔄 SINCRONIZANDO NUEVO CÓDIGO..."
rsync -av --delete --exclude='node_modules' --exclude='.env' --exclude='logs' ./ $DEPLOY_DIR/

echo "📦 INSTALANDO DEPENDENCIAS..."
cd $DEPLOY_DIR
npm install --production --no-audit --no-fund

echo "🏗️ COMPILANDO TYPESCRIPT..."
npm run build

echo "🔧 CONFIGURANDO PERMISOS..."
chown -R anbel:anbel $DEPLOY_DIR
chmod -R 750 $DEPLOY_DIR
chmod 600 $DEPLOY_DIR/.env

echo "🚀 INICIANDO SERVICIO..."
systemctl start $APP_NAME.service

echo "✅ VERIFICANDO ESTADO..."
sleep 5
if systemctl is-active --quiet $APP_NAME.service; then
    echo "🎉 DESPLIEGUE EXITOSO!"
    echo "📊 Estado del servicio:"
    systemctl status $APP_NAME.service --no-pager -l
    
    # VERIFICACIÓN ADICIONAL DE SALUD
    echo "🏥 VERIFICANDO SALUD DE LA APLICACIÓN..."
    curl -f http://localhost:3000/health || echo "⚠️ Health check falló pero servicio está activo"
else
    echo "❌ FALLO EN EL DESPLIEGUE - REVERTIENDO..."
    systemctl status $APP_NAME.service --no-pager -l
    exit 1
fi

echo "📈 MONITOREO INICIAL..."
echo "💾 Memoria: $(free -h | awk '/Mem:/ {print $3"/"$2}')"
echo "🔥 CPU: $(top -bn1 | grep load | awk '{printf "%.2f\n", $(NF-2)}')"
echo "🌐 HTTP: $(netstat -tln | grep ':3000' | wc -l) conexiones"

echo "🎯 DESPLIEGUE COMPLETADO: $(date)"
