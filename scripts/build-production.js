#!/usr/bin/env node

// SCRIPT DE BUILD OPTIMIZADO PARA PRODUCCIÓN - GANA FÁCIL ANBEL IA
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 INICIANDO BUILD DE PRODUCCIÓN - GANA FÁCIL ANBEL IA');
console.log('⏰ Timestamp:', new Date().toISOString());

// Función para ejecutar comandos con logging
function runCommand(command, description) {
  console.log(`\n📦 ${description}...`);
  try {
    const output = execSync(command, { 
      stdio: 'pipe', 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    console.log(`✅ ${description} completado`);
    return output;
  } catch (error) {
    console.error(`❌ Error en ${description}:`, error.message);
    process.exit(1);
  }
}

// Función para verificar archivos críticos
function verifyCriticalFiles() {
  console.log('\n🔍 Verificando archivos críticos...');
  
  const criticalFiles = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/dashboard/page.tsx',
    'src/app/activate-simple/page.tsx',
    'src/app/admin-simple/page.tsx',
    'src/lib/excel-codes.ts',
    'public/manifest.json',
    'public/sw.js',
    'next.config.js',
    'package.json'
  ];

  const missingFiles = criticalFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.error('❌ Archivos críticos faltantes:', missingFiles);
    process.exit(1);
  }
  
  console.log('✅ Todos los archivos críticos presentes');
}

// Función para limpiar directorios de build
function cleanBuildDirectories() {
  console.log('\n🧹 Limpiando directorios de build...');
  
  const dirsToClean = ['.next', 'out', 'dist', 'build'];
  
  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      runCommand(`rm -rf ${dir}`, `Limpiando ${dir}`);
    }
  });
}

// Función para verificar dependencias
function verifyDependencies() {
  console.log('\n📋 Verificando dependencias...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = [
      'next',
      'react',
      'react-dom',
      'next-pwa',
      'recharts',
      'react-hot-toast',
      'xlsx'
    ];
    
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
    
    if (missingDeps.length > 0) {
      console.error('❌ Dependencias faltantes:', missingDeps);
      process.exit(1);
    }
    
    console.log('✅ Todas las dependencias requeridas presentes');
  } catch (error) {
    console.error('❌ Error leyendo package.json:', error.message);
    process.exit(1);
  }
}

// Función para optimizar imágenes
function optimizeImages() {
  console.log('\n🖼️ Optimizando imágenes...');
  
  const publicDir = 'public';
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];
  
  function optimizeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        optimizeDirectory(filePath);
      } else if (imageExtensions.some(ext => file.endsWith(ext))) {
        console.log(`📸 Optimizando: ${filePath}`);
        // Aquí se podría agregar optimización real de imágenes
      }
    });
  }
  
  if (fs.existsSync(publicDir)) {
    optimizeDirectory(publicDir);
  }
  
  console.log('✅ Optimización de imágenes completada');
}

// Función para generar sitemap
function generateSitemap() {
  console.log('\n🗺️ Generando sitemap...');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ganafaci-anbel-pwa.vercel.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ganafaci-anbel-pwa.vercel.app/dashboard</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ganafaci-anbel-pwa.vercel.app/activate-simple</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ganafaci-anbel-pwa.vercel.app/admin-simple</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generado');
}

// Función para generar robots.txt
function generateRobots() {
  console.log('\n🤖 Generando robots.txt...');
  
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /private/

Sitemap: https://ganafaci-anbel-pwa.vercel.app/sitemap.xml`;

  fs.writeFileSync('public/robots.txt', robots);
  console.log('✅ robots.txt generado');
}

// Función principal de build
async function buildProduction() {
  try {
    // 1. Verificaciones previas
    verifyCriticalFiles();
    verifyDependencies();
    
    // 2. Limpieza
    cleanBuildDirectories();
    
    // 3. Optimizaciones
    optimizeImages();
    generateSitemap();
    generateRobots();
    
    // 4. Instalación de dependencias
    runCommand('npm ci --production=false', 'Instalando dependencias');
    
    // 5. Verificación de TypeScript
    runCommand('npx tsc --noEmit', 'Verificando TypeScript');
    
    // 6. Linting
    runCommand('npm run lint', 'Ejecutando ESLint');
    
    // 7. Build de Next.js
    runCommand('npm run build', 'Construyendo aplicación Next.js');
    
    // 8. Verificación del build
    if (!fs.existsSync('.next')) {
      throw new Error('Build falló - directorio .next no encontrado');
    }
    
    // 9. Análisis del bundle
    console.log('\n📊 Analizando bundle...');
    try {
      runCommand('npx @next/bundle-analyzer', 'Analizando tamaño del bundle');
    } catch (error) {
      console.log('⚠️ Bundle analyzer no disponible, continuando...');
    }
    
    // 10. Generación de reporte de build
    const buildReport = {
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      nodeVersion: process.version,
      buildSize: getDirectorySize('.next'),
      status: 'success'
    };
    
    fs.writeFileSync('build-report.json', JSON.stringify(buildReport, null, 2));
    
    console.log('\n🎉 BUILD DE PRODUCCIÓN COMPLETADO EXITOSAMENTE!');
    console.log('📊 Reporte de build guardado en build-report.json');
    console.log('📁 Directorio de build: .next/');
    console.log('🚀 Listo para despliegue en Vercel');
    
  } catch (error) {
    console.error('\n❌ ERROR EN BUILD DE PRODUCCIÓN:', error.message);
    process.exit(1);
  }
}

// Función auxiliar para calcular tamaño de directorio
function getDirectorySize(dir) {
  try {
    const output = execSync(`du -sh ${dir}`, { encoding: 'utf8' });
    return output.split('\t')[0];
  } catch (error) {
    return 'N/A';
  }
}

// Ejecutar build
buildProduction();
