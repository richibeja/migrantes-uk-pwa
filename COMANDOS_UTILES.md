# 🔧 COMANDOS ÚTILES - PROYECTO GANAFÁCIL

## 🔒 SISTEMA DE PROTECCIÓN

### Activar Candado
```bash
node scripts/lock-project.js
```
- Crea respaldos de todos los archivos críticos
- Genera hashes de verificación
- Activa el sistema de protección completo

### Verificación Rápida
```bash
node scripts/quick-check.js
```
- Verificación rápida del estado del proyecto
- Muestra archivos críticos y sus tamaños
- Verifica que el sistema de protección esté activo

### Verificación de Integridad
```bash
node scripts/verify-integrity.js
```
- Verificación completa de integridad
- Compara hashes actuales con respaldos
- Detecta cambios no autorizados

### Restaurar Proyecto
```bash
node scripts/restore-project.js
```
- Restaura todos los archivos desde respaldos
- Útil si algo se rompe accidentalmente
- Restaura el estado exacto del momento del candado

## 🚀 DESPLIEGUE

### Despliegue Seguro
```bash
node scripts/safe-deploy.js
```
- Despliega con verificación de integridad
- Crea respaldos antes del despliegue
- Verifica post-despliegue

### Despliegue Manual
```bash
git add .
git commit -m "Mensaje del commit"
vercel --prod
```

## 🔍 VERIFICACIÓN

### Verificar Conexiones
```bash
node scripts/verify-all-connections.js
```
- Verifica APIs de loterías
- Verifica configuración de Gemini AI
- Verifica archivos de configuración

### Verificar Linting
```bash
npm run lint
```
- Verifica errores de código
- Aplica reglas de estilo
- Sugiere correcciones

## 🛠️ DESARROLLO

### Instalar Dependencias
```bash
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
```

### Construir para Producción
```bash
npm run build
```

### Ejecutar Tests
```bash
npm test
```

## 📊 MONITOREO

### Estado del Proyecto
```bash
node scripts/quick-check.js
```

### Verificar APIs
```bash
node scripts/verify-all-connections.js
```

### Verificar Integridad
```bash
node scripts/verify-integrity.js
```

## 🔧 MANTENIMIENTO

### Limpiar Cache
```bash
npm run clean
```

### Actualizar Dependencias
```bash
npm update
```

### Verificar Seguridad
```bash
npm audit
```

## 🚨 EMERGENCIAS

### Restaurar Todo
```bash
node scripts/restore-project.js
```

### Verificar Estado
```bash
node scripts/quick-check.js
```

### Activar Protección
```bash
node scripts/lock-project.js
```

## 📋 COMANDOS COMBINADOS

### Verificación Completa
```bash
node scripts/quick-check.js && node scripts/verify-all-connections.js
```

### Despliegue con Verificación
```bash
node scripts/safe-deploy.js
```

### Restaurar y Verificar
```bash
node scripts/restore-project.js && node scripts/quick-check.js
```

---
**🔒 PROYECTO CERRADO CON CANDADO - COMANDOS SEGUROS** 🔒
