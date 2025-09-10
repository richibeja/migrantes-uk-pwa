#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Creando versión limpia del DashboardPage...\n');

// Leer el archivo actual
let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

// Encontrar el inicio del componente
const componentStart = content.indexOf('export default function DashboardPage() {');
const componentBodyStart = content.indexOf('{', componentStart) + 1;

// Encontrar todos los useState al inicio
const useStatePattern = /const\s+\[([^,]+),\s*set([^\]]+)\]\s*=\s*useState\([^)]*\);/g;
const useStateMatches = [];
let match;

while ((match = useStatePattern.exec(content)) !== null) {
  if (match.index < 300) { // Solo los primeros useState
    useStateMatches.push(match[0]);
  }
}

// Encontrar todos los useEffect al inicio (primeros 6)
const useEffectPattern = /useEffect\(\(\)\s*=>\s*\{[\s\S]*?\},?\s*\[\]\);/g;
const useEffectMatches = [];
let effectMatch;
let count = 0;

while ((effectMatch = useEffectPattern.exec(content)) !== null && count < 6) {
  if (effectMatch.index < 300) { // Solo los primeros useEffect
    useEffectMatches.push(effectMatch[0]);
    count++;
  }
}

// Encontrar el primer return condicional
const returnPattern = /if\s+\([^)]+\)\s*\{[\s\S]*?return\s*\(/;
const returnMatch = content.match(returnPattern);

if (returnMatch) {
  const returnIndex = returnMatch.index;
  
  // Crear la nueva estructura
  let newContent = content.substring(0, componentBodyStart) + '\n';
  
  // Agregar todos los useState
  useStateMatches.forEach(useState => {
    newContent += '  ' + useState + '\n';
  });
  
  newContent += '\n';
  
  // Agregar todos los useEffect
  useEffectMatches.forEach(useEffect => {
    newContent += '  ' + useEffect + '\n';
  });
  
  newContent += '\n';
  
  // Agregar el resto del contenido después del primer return
  newContent += content.substring(returnIndex);
  
  // Guardar el archivo corregido
  fs.writeFileSync('src/app/dashboard/page.tsx', newContent);
  
  console.log(`✅ Hooks reorganizados:`);
  console.log(`   - useState: ${useStateMatches.length}`);
  console.log(`   - useEffect: ${useEffectMatches.length}`);
  console.log('✨ Archivo corregido guardado');
} else {
  console.log('❌ No se encontró return condicional');
}
