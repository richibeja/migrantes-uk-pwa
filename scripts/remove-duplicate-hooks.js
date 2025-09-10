#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Eliminando hooks duplicados del DashboardPage...\n');

let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

// Encontrar la línea donde empiezan las funciones (después de los hooks iniciales)
const functionStartPattern = /\/\/ Función para calcular la próxima fecha de sorteo/;
const functionStartMatch = content.match(functionStartPattern);

if (functionStartMatch) {
  const functionStartIndex = functionStartMatch.index;
  
  // Encontrar el final de los hooks iniciales (antes de las funciones)
  const hooksEndPattern = /useEffect\(\(\)\s*=>\s*\{[\s\S]*?\},?\s*\[\]\);/g;
  let lastHookEnd = 0;
  let match;
  
  while ((match = hooksEndPattern.exec(content)) !== null) {
    if (match.index < functionStartIndex) {
      lastHookEnd = match.index + match[0].length;
    }
  }
  
  // Encontrar el final de las funciones (antes del primer return condicional)
  const returnPattern = /if\s+\([^)]+\)\s*\{[\s\S]*?return\s*\(/;
  const returnMatch = content.match(returnPattern);
  
  if (returnMatch) {
    const returnIndex = returnMatch.index;
    
    // Eliminar todos los hooks entre las funciones y el primer return
    const beforeFunctions = content.substring(0, lastHookEnd);
    const afterReturn = content.substring(returnIndex);
    
    // Buscar y eliminar hooks duplicados entre funciones y return
    const middleSection = content.substring(lastHookEnd, returnIndex);
    const cleanedMiddle = middleSection.replace(/useEffect\(\(\)\s*=>\s*\{[\s\S]*?\},?\s*\[\]\);/g, '');
    
    content = beforeFunctions + cleanedMiddle + afterReturn;
    
    console.log('✅ Hooks duplicados eliminados');
  } else {
    console.log('⚠️  No se encontró return condicional');
  }
} else {
  console.log('⚠️  No se encontró el patrón de inicio de funciones');
}

// Guardar el archivo corregido
fs.writeFileSync('src/app/dashboard/page.tsx', content);

console.log('✨ Archivo corregido guardado');
