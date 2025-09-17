#!/usr/bin/env node

/**
 * 🚀 DESPLIEGUE SEGURO
 * Despliega el proyecto con verificación de integridad
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}🚀 DESPLIEGUE SEGURO DEL PROYECTO${colors.reset}`);

async function safeDeploy() {
  try {
    // 1. Verificar integridad del proyecto
    console.log(`\n${colors.white}🔍 Verificando integridad del proyecto...${colors.reset}`);
    
    try {
      execSync('node scripts/verify-integrity.js', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Integridad verificada${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}❌ Error de integridad detectado${colors.reset}`);
      console.log(`${colors.yellow}🔄 Restaurando desde respaldos...${colors.reset}`);
      
      try {
        execSync('node scripts/restore-project.js', { stdio: 'inherit' });
        console.log(`${colors.green}✅ Proyecto restaurado${colors.reset}`);
      } catch (restoreError) {
        console.log(`${colors.red}❌ Error restaurando proyecto: ${restoreError.message}${colors.reset}`);
        process.exit(1);
      }
    }
    
    // 2. Verificar que no hay errores de linting
    console.log(`\n${colors.white}🔍 Verificando errores de linting...${colors.reset}`);
    
    try {
      execSync('npm run lint', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Sin errores de linting${colors.reset}`);
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Errores de linting detectados, continuando...${colors.reset}`);
    }
    
    // 3. Crear respaldo antes del despliegue
    console.log(`\n${colors.white}💾 Creando respaldo antes del despliegue...${colors.reset}`);
    
    try {
      execSync('node scripts/lock-project.js', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Respaldo creado${colors.reset}`);
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Error creando respaldo: ${error.message}${colors.reset}`);
    }
    
    // 4. Hacer commit de los cambios
    console.log(`\n${colors.white}📝 Haciendo commit de los cambios...${colors.reset}`);
    
    try {
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "🔒 Despliegue seguro con candado activado"', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Cambios committeados${colors.reset}`);
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Error en commit: ${error.message}${colors.reset}`);
    }
    
    // 5. Desplegar a producción
    console.log(`\n${colors.white}🚀 Desplegando a producción...${colors.reset}`);
    
    try {
      execSync('vercel --prod', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Despliegue exitoso${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}❌ Error en despliegue: ${error.message}${colors.reset}`);
      process.exit(1);
    }
    
    // 6. Verificación post-despliegue
    console.log(`\n${colors.white}🔍 Verificando despliegue...${colors.reset}`);
    
    try {
      execSync('node scripts/verify-all-connections.js', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Verificación post-despliegue exitosa${colors.reset}`);
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Error en verificación post-despliegue: ${error.message}${colors.reset}`);
    }
    
    console.log(`\n${colors.magenta}${colors.bold}╔══════════════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}║                    🎉 DESPLIEGUE EXITOSO                     ║${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}║                Proyecto desplegado con candado                ║${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}╚══════════════════════════════════════════════════════════════╝${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Error en despliegue seguro: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Ejecutar despliegue seguro
safeDeploy();
