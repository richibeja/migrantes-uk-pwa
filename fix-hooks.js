const fs = require('fs');
const path = require('path');

function fixHooksInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let hasHooks = false;
  let hasEarlyReturn = false;
  let hookLines = [];
  let returnLine = null;
  let returnContent = '';
  
  // Encontrar hooks y early returns
  lines.forEach((line, index) => {
    // Detectar hooks
    if (line.includes('useState') || line.includes('useEffect') || 
        line.includes('useContext') || line.includes('useMemo') ||
        line.includes('useCallback') || line.includes('useRef')) {
      hasHooks = true;
      hookLines.push(index);
    }
    
    // Detectar early returns
    if ((line.includes('return null') || line.includes('return <') || 
         line.includes('return (')) && hasHooks && !returnLine) {
      hasEarlyReturn = true;
      returnLine = index;
      returnContent = line;
    }
  });
  
  if (hasHooks && hasEarlyReturn && returnLine > Math.min(...hookLines)) {
    console.log(`🔧 Corrigiendo: ${filePath}`);
    
    // Encontrar la función del componente
    let functionStart = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export default function') || 
          lines[i].includes('function ') && lines[i].includes('(')) {
        functionStart = i;
        break;
      }
    }
    
    if (functionStart === -1) {
      console.log(`   ❌ No se encontró la función del componente`);
      return false;
    }
    
    // Encontrar el final de los parámetros de la función
    let functionBodyStart = functionStart;
    let braceCount = 0;
    let inParams = false;
    
    for (let i = functionStart; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes('(')) {
        inParams = true;
        braceCount++;
      }
      if (line.includes(')')) {
        braceCount--;
        if (braceCount === 0 && inParams) {
          functionBodyStart = i + 1;
          break;
        }
      }
    }
    
    // Mover el early return al inicio de la función
    const newLines = [...lines];
    
    // Eliminar el early return original
    newLines.splice(returnLine, 1);
    
    // Insertar el early return después de la declaración de la función
    newLines.splice(functionBodyStart, 0, returnContent);
    
    // Escribir el archivo corregido
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`   ✅ Corregido`);
    return true;
  }
  
  return false;
}

// Escanear todos los archivos
const srcPath = path.join(__dirname, 'src');
const files = [];

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });
}

scanDirectory(srcPath);

let fixedCount = 0;
files.forEach(file => {
  if (fixHooksInFile(file)) {
    fixedCount++;
  }
});

console.log(`\n🎉 CORRECCIÓN COMPLETA:`);
console.log(`   Archivos corregidos: ${fixedCount}`);
console.log(`   Total archivos procesados: ${files.length}`);
