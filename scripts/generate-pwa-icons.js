const fs = require('fs');
const path = require('path');

// Crear directorio de iconos si no existe
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Tamaños de iconos necesarios para PWA
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

// SVG base para el icono
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#2c3e50"/>
  <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.15}" fill="#3498db"/>
  <circle cx="${size * 0.3}" cy="${size * 0.3}" r="${size * 0.08}" fill="#2ecc71"/>
  <path d="M${size * 0.2} ${size * 0.5} L${size * 0.4} ${size * 0.7} L${size * 0.8} ${size * 0.3}" stroke="#ffffff" stroke-width="${size * 0.03}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="${size * 0.5}" y="${size * 0.85}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold">GF</text>
</svg>
`;

// Generar iconos SVG
iconSizes.forEach(size => {
  const svgContent = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`Generated ${filename}`);
});

// Crear un icono PNG simple usando canvas (simulado)
const createPNGIcon = (size) => {
  // En un entorno real, usarías una librería como sharp o canvas
  // Por ahora, creamos un archivo placeholder
  const placeholder = `# PNG Icon ${size}x${size}
# Este es un placeholder. En producción, usar una librería como sharp para generar PNGs reales.
# Comando sugerido: npx sharp-cli -i icon-${size}x${size}.svg -o icon-${size}x${size}.png
`;
  
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, placeholder);
  console.log(`Generated placeholder for ${filename}`);
};

// Generar placeholders PNG
iconSizes.forEach(size => {
  createPNGIcon(size);
});

console.log('PWA icons generated successfully!');
console.log('Note: PNG files are placeholders. Use a tool like sharp to convert SVG to PNG in production.');
