const fs = require('fs');
const path = require('path');

function fixSyntaxErrors(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let fixed = false;
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detectar patrón problemático: "return (" seguido de hooks en la siguiente línea
    if (line.trim().includes('return (') && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (nextLine.trim().startsWith('const ') && 
          (nextLine.includes('useState') || nextLine.includes('useEffect') || 
           nextLine.includes('useContext') || nextLine.includes('useMemo') ||
           nextLine.includes('useCallback') || nextLine.includes('useRef'))) {
        
        // Encontrar el final de la función para mover el return
        let functionEnd = i;
        let braceCount = 0;
        let foundReturn = false;
        
        for (let j = i; j < lines.length; j++) {
          const currentLine = lines[j];
          if (currentLine.includes('return (')) {
            foundReturn = true;
          }
          if (foundReturn && currentLine.includes(');')) {
            functionEnd = j;
            break;
          }
        }
        
        // Mover todos los hooks antes del return
        const hooks = [];
        const otherLines = [];
        
        for (let j = i + 1; j <= functionEnd; j++) {
          const currentLine = lines[j];
          if (currentLine.trim().startsWith('const ') && 
              (currentLine.includes('useState') || currentLine.includes('useEffect') || 
               currentLine.includes('useContext') || currentLine.includes('useMemo') ||
               currentLine.includes('useCallback') || currentLine.includes('useRef'))) {
            hooks.push(currentLine);
          } else if (!currentLine.trim().startsWith('return (') && 
                     !currentLine.trim().includes(');') && 
                     currentLine.trim() !== '') {
            otherLines.push(currentLine);
          }
        }
        
        // Reconstruir el archivo
        newLines.push(line.replace('return (', '').trim());
        newLines.push(...hooks);
        newLines.push(...otherLines);
        
        // Buscar el return statement correcto
        for (let j = functionEnd; j < lines.length; j++) {
          if (lines[j].includes('return (') && !lines[j].includes('const ')) {
            newLines.push(lines[j]);
            break;
          }
        }
        
        // Saltar las líneas ya procesadas
        i = functionEnd;
        fixed = true;
        continue;
      }
    }
    
    newLines.push(line);
  }
  
  if (fixed) {
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`✅ Corregido: ${filePath}`);
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
  if (fixSyntaxErrors(file)) {
    fixedCount++;
  }
});

console.log(`\n🎉 CORRECCIÓN DE SINTAXIS COMPLETA:`);
console.log(`   Archivos corregidos: ${fixedCount}`);
console.log(`   Total archivos procesados: ${files.length}`);
