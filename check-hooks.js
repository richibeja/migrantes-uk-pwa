const fs = require('fs');
const path = require('path');

function checkHooksUsage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let hasHooks = false;
  let hasEarlyReturn = false;
  let hookLines = [];
  let returnLine = null;
  
  lines.forEach((line, index) => {
    // Detectar hooks
    if (line.includes('useState') || line.includes('useEffect') || 
        line.includes('useContext') || line.includes('useMemo') ||
        line.includes('useCallback') || line.includes('useRef')) {
      hasHooks = true;
      hookLines.push(index + 1);
    }
    
    // Detectar early returns
    if ((line.includes('return null') || line.includes('return <') || 
         line.includes('return (')) && hasHooks && !returnLine) {
      hasEarlyReturn = true;
      returnLine = index + 1;
    }
  });
  
  if (hasHooks && hasEarlyReturn && returnLine > Math.min(...hookLines)) {
    console.error(`❌ PROBLEMA EN: ${filePath}`);
    console.error(`   Hooks en líneas: ${hookLines.join(', ')}`);
    console.error(`   Early return en línea: ${returnLine}`);
    return false;
  }
  
  return true;
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

let hasErrors = false;
files.forEach(file => {
  if (!checkHooksUsage(file)) {
    hasErrors = true;
  }
});

if (hasErrors) {
  console.log('\n🔧 CORRECCIONES NECESARIAS:');
  console.log('1. Mover early returns ANTES de los hooks');
  console.log('2. Eliminar hooks dentro de condicionales');
  console.log('3. Verificar dependencias de useEffect');
  process.exit(1);
} else {
  console.log('✅ Todos los hooks están correctamente ordenados');
}
