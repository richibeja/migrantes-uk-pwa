#!/usr/bin/env node

/**
 * 🔍 SCRIPT DE VERIFICACIÓN AUTOMÁTICA
 * Verifica la integridad del proyecto automáticamente
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const backupDir = path.join(__dirname, '..', 'backups');
const protectionFile = path.join(backupDir, 'protection-data.json');

if (!fs.existsSync(protectionFile)) {
  console.log('❌ No se encontraron datos de protección');
  process.exit(1);
}

const protectionData = JSON.parse(fs.readFileSync(protectionFile, 'utf8'));
let issues = 0;

for (const [filePath, fileData] of Object.entries(protectionData.files)) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (fs.existsSync(fullPath)) {
    const currentHash = crypto.createHash('sha256').update(fs.readFileSync(fullPath, 'utf8')).digest('hex');
    if (currentHash !== fileData.hash) {
      console.log(`❌ ${filePath} - INTEGRIDAD COMPROMETIDA`);
      issues++;
    }
  } else {
    console.log(`⚠️  ${filePath} - Archivo no encontrado`);
    issues++;
  }
}

if (issues === 0) {
  console.log('✅ Proyecto protegido correctamente');
  process.exit(0);
} else {
  console.log(`❌ Se encontraron ${issues} problemas`);
  process.exit(1);
}
