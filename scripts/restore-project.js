#!/usr/bin/env node

/**
 * 🔄 SCRIPT DE RESTAURACIÓN
 * Restaura el proyecto desde respaldos
 */

const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '..', 'backups');
const protectionFile = path.join(backupDir, 'protection-data.json');

if (!fs.existsSync(protectionFile)) {
  console.log('❌ No se encontraron datos de protección');
  process.exit(1);
}

const protectionData = JSON.parse(fs.readFileSync(protectionFile, 'utf8'));

console.log('🔄 Restaurando proyecto desde respaldos...');

let restored = 0;
for (const [filePath, fileData] of Object.entries(protectionData.files)) {
  if (fileData.backup && fs.existsSync(fileData.backup)) {
    const fullPath = path.join(__dirname, '..', filePath);
    fs.copyFileSync(fileData.backup, fullPath);
    console.log(`✅ ${filePath} restaurado`);
    restored++;
  }
}

console.log(`🎉 ${restored} archivos restaurados`);
