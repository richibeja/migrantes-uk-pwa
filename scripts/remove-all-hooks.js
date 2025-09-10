#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Eliminando TODOS los hooks duplicados del DashboardPage...\n');

let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

// Encontrar el inicio del componente
const componentStart = content.indexOf('export default function DashboardPage() {');
const componentBodyStart = content.indexOf('{', componentStart) + 1;

// Encontrar todos los useState al inicio (primeros 15)
const useStatePattern = /const\s+\[([^,]+),\s*set([^\]]+)\]\s*=\s*useState\([^)]*\);/g;
const useStateMatches = [];
let match;
let count = 0;

while ((match = useStatePattern.exec(content)) !== null && count < 15) {
  if (match.index < 200) { // Solo los primeros useState
    useStateMatches.push(match[0]);
    count++;
  }
}

// Encontrar todos los useEffect al inicio (primeros 6)
const useEffectPattern = /useEffect\(\(\)\s*=>\s*\{[\s\S]*?\},?\s*\[\]\);/g;
const useEffectMatches = [];
let effectMatch;
let effectCount = 0;

while ((effectMatch = useEffectPattern.exec(content)) !== null && effectCount < 6) {
  if (effectMatch.index < 200) { // Solo los primeros useEffect
    useEffectMatches.push(effectMatch[0]);
    effectCount++;
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
